const express = require("express");
const rolesService = require("../services/roles.service");

const router = express.Router();

router.get("/", (request, response) => {
  response.json({
    success: true,
    data: rolesService.listRoles(),
  });
});

module.exports = router;
