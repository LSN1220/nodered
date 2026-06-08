const express = require("express");

const router = express.Router();

router.get("/profile", (request, response) => {
  response.json({
    success: true,
    data: {
      id: 1,
      name: "Alice",
      role: "admin",
    },
  });
});

router.get("/admin", (request, response) => {
  response.json({
    success: true,
    message: "You passed the route-level auth middleware.",
  });
});

router.get("/error", (request, response, next) => {
  next(new Error("This route intentionally throws an error"));
});

module.exports = router;
