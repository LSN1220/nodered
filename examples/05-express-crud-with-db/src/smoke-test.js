const assert = require("node:assert/strict");
const { app } = require("./app");
const { db } = require("./db/database");
const { createSchema } = require("./db/schema");

function resetData() {
  createSchema();
  db.exec("DELETE FROM users;");

  const insertUser = db.prepare(`
    INSERT INTO users (name, email, role)
    VALUES (@name, @email, @role)
  `);

  [
    { name: "Alice", email: "alice@example.com", role: "admin" },
    { name: "Bob", email: "bob@example.com", role: "editor" },
    { name: "Carol", email: "carol@example.com", role: "viewer" },
  ].forEach((user) => insertUser.run(user));
}

async function requestJson(baseUrl, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = response.status === 204 ? null : await response.json();

  return {
    status: response.status,
    body,
  };
}

async function run() {
  resetData();

  const server = app.listen(0);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const list = await requestJson(baseUrl, "/users");
    assert.equal(list.status, 200);
    assert.equal(list.body.pagination.total, 3);

    const created = await requestJson(baseUrl, "/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "Dave",
        email: "dave@example.com",
        role: "viewer",
      }),
    });
    assert.equal(created.status, 201);
    assert.equal(created.body.data.name, "Dave");

    const updated = await requestJson(baseUrl, `/users/${created.body.data.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "Dave Updated",
        email: "dave.updated@example.com",
        role: "editor",
      }),
    });
    assert.equal(updated.status, 200);
    assert.equal(updated.body.data.role, "editor");

    const deleted = await requestJson(baseUrl, `/users/${created.body.data.id}`, {
      method: "DELETE",
    });
    assert.equal(deleted.status, 204);

    console.log("05-express-crud-with-db smoke test passed.");
  } finally {
    server.close();
  }
}

run().catch((error) => {
  console.error("Smoke test failed:", error);
  process.exitCode = 1;
});
