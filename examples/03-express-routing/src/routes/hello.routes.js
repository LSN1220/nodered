const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
  // Query parameters are optional values after `?` in the URL.
  // Example: /hello?name=Alice
  const name = request.query.name || "world";

  response.json({
    message: `Hello, ${name}!`,
  });
});

module.exports = router;
