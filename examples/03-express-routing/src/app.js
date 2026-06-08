const express = require("express");
const helloRouter = require("./routes/hello.routes");
const usersRouter = require("./routes/users.routes");

const app = express();
const port = process.env.PORT || 3000;

// Root route: often used as a quick way to confirm the service is alive.
app.get("/", (request, response) => {
  response.json({
    message: "Express routing demo is running.",
  });
});

app.use("/hello", helloRouter);
app.use("/users", usersRouter);

function start() {
  return app.listen(port, () => {
    console.log(`Express routing demo is listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = {
  app,
  start,
};
