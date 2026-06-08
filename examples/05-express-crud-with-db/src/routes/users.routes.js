const express = require("express");
const usersService = require("../services/users.service");

const router = express.Router();

function validateUserPayload(request, response, next) {
  const { name, email, role } = request.body;
  const allowedRoles = ["admin", "editor", "viewer"];

  if (!name || !email || !role) {
    return response.status(400).json({
      success: false,
      message: "name, email, and role are required",
    });
  }

  if (!allowedRoles.includes(role)) {
    return response.status(400).json({
      success: false,
      message: "role must be one of: admin, editor, viewer",
    });
  }

  return next();
}

router.get("/", (request, response) => {
  const result = usersService.listUsers(request.query);

  response.json({
    success: true,
    ...result,
  });
});

router.get("/:id", (request, response) => {
  const user = usersService.getUserById(Number(request.params.id));

  if (!user) {
    return response.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return response.json({
    success: true,
    data: user,
  });
});

router.post("/", validateUserPayload, (request, response, next) => {
  try {
    const user = usersService.createUser(request.body);

    response.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateUserPayload, (request, response, next) => {
  try {
    const user = usersService.updateUser(Number(request.params.id), request.body);

    if (!user) {
      return response.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", (request, response) => {
  const deleted = usersService.deleteUser(Number(request.params.id));

  if (!deleted) {
    return response.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return response.status(204).send();
});

module.exports = router;
