const express = require("express");
const logsService = require("../services/logs.service");

const router = express.Router();

router.get("/", (request, response) => {
  response.json({
    success: true,
    data: logsService.listOperationLogs(),
  });
});

module.exports = router;
