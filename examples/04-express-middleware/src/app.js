const express = require("express");
const { requestLogger } = require("./middleware/request-logger");
const { requireDemoToken } = require("./middleware/auth");
const { notFoundHandler, errorHandler } = require("./middleware/error-handlers");
const apiRouter = require("./routes/api.routes");

const app = express();
const port = process.env.PORT || 3001;

// Built-in middleware: parses JSON request bodies into request.body.
app.use(express.json());

// Global middleware: every request passes through it.
app.use(requestLogger);

app.get("/", (request, response) => {
  response.json({
    message: "Express middleware demo is running.",
  });
});

// Route-level middleware: only /api routes use requireDemoToken.
app.use("/api", requireDemoToken, apiRouter);

// Keep these at the end so normal routes get a chance to match first.
app.use(notFoundHandler);
app.use(errorHandler);

function start() {
  return app.listen(port, () => {
    console.log(`Express middleware demo is listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = {
  app,
  start,
};
