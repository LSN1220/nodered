const express = require("express");
const telemetryService = require("../services/telemetry.service");

const router = express.Router();

router.get("/latest", (request, response) => {
  response.json({
    success: true,
    data: telemetryService.latestTelemetry(),
  });
});

router.get("/events", (request, response) => {
  response.json({
    success: true,
    data: telemetryService.listTelemetryEvents(request.query),
  });
});

module.exports = router;
