const express = require("express");
const usersService = require("../services/users.service");
const { verifyPassword } = require("../utils/passwords");
const { createDemoToken } = require("../utils/tokens");

const router = express.Router();

router.post("/login", (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      success: false,
      message: "email and password are required",
    });
  }

  const user = usersService.getUserByEmail(email);

  if (!user || user.status !== "active" || !verifyPassword(password, user.password_hash)) {
    return response.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  return response.json({
    success: true,
    data: {
      token: createDemoToken(user.id),
      user: usersService.getUserProfileById(user.id),
    },
  });
});

module.exports = router;
