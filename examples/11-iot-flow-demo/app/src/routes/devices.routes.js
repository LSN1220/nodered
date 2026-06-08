const express = require("express");
const devicesService = require("../services/devices.service");

const router = express.Router();

router.get("/", (request, response) => {
  response.json({
    success: true,
    data: devicesService.listDevices(),
  });
});

router.post("/", (request, response, next) => {
  try {
    const { sn, name, type, location } = request.body;

    if (!sn || !name || !type || !location) {
      return response.status(400).json({
        success: false,
        message: "sn, name, type, and location are required",
      });
    }

    const device = devicesService.createDevice({ sn, name, type, location });

    return response.status(201).json({
      success: true,
      data: device,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
