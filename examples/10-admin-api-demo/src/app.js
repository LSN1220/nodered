const express = require("express");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const rolesRoutes = require("./routes/roles.routes");
const permissionsRoutes = require("./routes/permissions.routes");
const operationLogsRoutes = require("./routes/operation-logs.routes");
const { authenticate } = require("./middleware/authenticate");
const { errorHandler, notFoundHandler } = require("./middleware/errors");
const { createSchema } = require("./db/schema");

createSchema();

const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    message: "Admin API demo is running.",
  });
});

app.use("/auth", authRoutes);
app.use("/me", authenticate, (request, response) => {
  response.json({
    success: true,
    data: request.currentUser,
  });
});
app.use("/users", authenticate, usersRoutes);
app.use("/roles", authenticate, rolesRoutes);
app.use("/permissions", authenticate, permissionsRoutes);
app.use("/operation-logs", authenticate, operationLogsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

function start() {
  return app.listen(port, () => {
    console.log(`Admin API demo is listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = {
  app,
  start,
};
