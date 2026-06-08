const express = require("express");
const usersService = require("../services/users.service");
const logsService = require("../services/logs.service");

const router = express.Router();

function validateCreateUser(request, response, next) {
  const { name, email, password, status, roleIds } = request.body;

  if (!name || !email || !password) {
    return response.status(400).json({
      success: false,
      message: "name, email, and password are required",
    });
  }

  if (status && !["active", "disabled"].includes(status)) {
    return response.status(400).json({
      success: false,
      message: "status must be active or disabled",
    });
  }

  if (roleIds && !Array.isArray(roleIds)) {
    return response.status(400).json({
      success: false,
      message: "roleIds must be an array",
    });
  }

  return next();
}

function validateUpdateUser(request, response, next) {
  const { name, email, status, roleIds } = request.body;

  if (!name || !email || !status) {
    return response.status(400).json({
      success: false,
      message: "name, email, and status are required",
    });
  }

  if (!["active", "disabled"].includes(status)) {
    return response.status(400).json({
      success: false,
      message: "status must be active or disabled",
    });
  }

  if (roleIds && !Array.isArray(roleIds)) {
    return response.status(400).json({
      success: false,
      message: "roleIds must be an array",
    });
  }

  return next();
}

router.get("/", (request, response) => {
  response.json({
    success: true,
    ...usersService.listUsers(request.query),
  });
});

router.get("/:id", (request, response) => {
  const user = usersService.getUserProfileById(Number(request.params.id));

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

router.post("/", validateCreateUser, (request, response, next) => {
  try {
    const user = usersService.createUser(request.body);
    logsService.createOperationLog({
      actorUserId: request.currentUser.id,
      action: "create",
      resource: "users",
      detail: { userId: user.id, email: user.email },
    });

    response.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateUpdateUser, (request, response, next) => {
  try {
    const user = usersService.updateUser(Number(request.params.id), request.body);

    if (!user) {
      return response.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    logsService.createOperationLog({
      actorUserId: request.currentUser.id,
      action: "update",
      resource: "users",
      detail: { userId: user.id, email: user.email },
    });

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

  logsService.createOperationLog({
    actorUserId: request.currentUser.id,
    action: "delete",
    resource: "users",
    detail: { userId: Number(request.params.id) },
  });

  return response.status(204).send();
});

module.exports = router;
