const express = require("express");
const telemetryService = require("../services/telemetry.service");

const router = express.Router();

router.post("/telemetry", (request, response, next) => {
  try {
    const { deviceSn, temperature, humidity, recordedAt } = request.body;

    if (!deviceSn || typeof temperature !== "number") {
      return response.status(400).json({
        success: false,
        message: "deviceSn and numeric temperature are required",
      });
    }

    const result = telemetryService.ingestTelemetry({
      deviceSn,
      temperature,
      humidity,
      recordedAt: recordedAt || new Date().toISOString(),
    });

    return response.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
