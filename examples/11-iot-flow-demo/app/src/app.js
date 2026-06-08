const express = require("express");
const devicesRoutes = require("./routes/devices.routes");
const telemetryRoutes = require("./routes/telemetry.routes");
const alertsRoutes = require("./routes/alerts.routes");
const internalRoutes = require("./routes/internal.routes");
const { errorHandler, notFoundHandler } = require("./middleware/errors");
const { createSchema } = require("./db/schema");

createSchema();

const app = express();
const port = process.env.PORT || 3020;

app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    message: "IoT flow demo API is running.",
  });
});

app.use("/devices", devicesRoutes);
app.use("/telemetry", telemetryRoutes);
app.use("/alerts", alertsRoutes);
app.use("/internal", internalRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

function start() {
  return app.listen(port, () => {
    console.log(`IoT flow demo API is listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = {
  app,
  start,
};
