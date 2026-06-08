const assert = require("node:assert/strict");
const { app } = require("./app");
require("./scripts/seed");

async function requestJson(baseUrl, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = response.status === 204 ? null : await response.json();

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
    const login = await requestJson(baseUrl, "/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "alice@example.com",
        password: "password123",
      }),
    });
    assert.equal(login.status, 200);

    const token = login.body.data.token;
    const authHeaders = {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };

    const me = await requestJson(baseUrl, "/me", {
      headers: authHeaders,
    });
    assert.equal(me.status, 200);
    assert.equal(me.body.data.email, "alice@example.com");

    const roles = await requestJson(baseUrl, "/roles", {
      headers: authHeaders,
    });
    assert.equal(roles.status, 200);
    assert.equal(roles.body.data.length, 3);

    const created = await requestJson(baseUrl, "/users", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        name: "Carol",
        email: "carol@example.com",
        password: "password123",
        status: "active",
        roleIds: [3],
      }),
    });
    assert.equal(created.status, 201);
    assert.equal(created.body.data.email, "carol@example.com");

    const updated = await requestJson(baseUrl, `/users/${created.body.data.id}`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({
        name: "Carol Updated",
        email: "carol.updated@example.com",
        status: "disabled",
        roleIds: [2],
      }),
    });
    assert.equal(updated.status, 200);
    assert.equal(updated.body.data.status, "disabled");

    const deleted = await requestJson(baseUrl, `/users/${created.body.data.id}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    assert.equal(deleted.status, 204);

    const logs = await requestJson(baseUrl, "/operation-logs", {
      headers: authHeaders,
    });
    assert.equal(logs.status, 200);
    assert.ok(logs.body.data.length >= 3);

    console.log("10-admin-api-demo smoke test passed.");
  } finally {
    server.close();
  }
}

run().catch((error) => {
  console.error("Smoke test failed:", error);
  process.exitCode = 1;
});
