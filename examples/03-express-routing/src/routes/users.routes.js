const express = require("express");

const router = express.Router();

const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "editor" },
  { id: 3, name: "Carol", role: "viewer" },
];

router.get("/", (request, response) => {
  response.json({
    count: users.length,
    data: users,
  });
});

router.get("/:id", (request, response) => {
  // Path parameters come from the URL path itself.
  // Example: /users/2 -> request.params.id is "2"
  const userId = Number(request.params.id);
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return response.status(404).json({
      message: "User not found",
    });
  }

  return response.json({
    data: user,
  });
});

module.exports = router;
