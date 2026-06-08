const assert = require("node:assert/strict");
const { app } = require("./app");

async function requestJson(baseUrl, path) {
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.json();

  return {
    status: response.status,
    body,
  };
}

async function run() {
  const server = app.listen(0);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const root = await requestJson(baseUrl, "/");
    assert.equal(root.status, 200);
    assert.equal(root.body.message, "Express routing demo is running.");

    const hello = await requestJson(baseUrl, "/hello?name=Alice");
    assert.equal(hello.status, 200);
    assert.equal(hello.body.message, "Hello, Alice!");

    const user = await requestJson(baseUrl, "/users/1");
    assert.equal(user.status, 200);
    assert.equal(user.body.data.name, "Alice");

    console.log("03-express-routing smoke test passed.");
  } finally {
    server.close();
  }
}

run().catch((error) => {
  console.error("Smoke test failed:", error);
  process.exitCode = 1;
});
