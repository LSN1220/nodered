const assert = require("node:assert/strict");
const { app } = require("./app");

async function requestJson(baseUrl, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
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

    const unauthorized = await requestJson(baseUrl, "/api/profile");
    assert.equal(unauthorized.status, 401);

    const profile = await requestJson(baseUrl, "/api/profile", {
      headers: {
        "x-demo-token": "dev-token",
      },
    });
    assert.equal(profile.status, 200);
    assert.equal(profile.body.data.name, "Alice");

    const error = await requestJson(baseUrl, "/api/error", {
      headers: {
        "x-demo-token": "dev-token",
      },
    });
    assert.equal(error.status, 500);

    console.log("04-express-middleware smoke test passed.");
  } finally {
    server.close();
  }
}

run().catch((error) => {
  console.error("Smoke test failed:", error);
  process.exitCode = 1;
});
