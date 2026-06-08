const express = require("express");
const usersRouter = require("./routes/users.routes");

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    message: "Express CRUD with DB demo is running.",
  });
});

app.use("/users", usersRouter);

app.use((error, request, response, next) => {
  void next;

  console.error("Unhandled error:", error.message);

  response.status(500).json({
    success: false,
    message: error.message,
  });
});

function start() {
  return app.listen(port, () => {
    console.log(`Express CRUD with DB demo is listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = {
  app,
  start,
};
