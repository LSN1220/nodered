const express = require("express");
const alertsService = require("../services/alerts.service");

const router = express.Router();

router.get("/", (request, response) => {
  response.json({
    success: true,
    data: alertsService.listAlerts(),
  });
});

module.exports = router;
