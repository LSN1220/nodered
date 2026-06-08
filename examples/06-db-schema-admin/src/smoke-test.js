const assert = require("node:assert/strict");
const { db } = require("./db");
require("./seed");

const alicePermissions = db
  .prepare(
    `
    SELECT DISTINCT p.code
    FROM users u
    JOIN user_roles ur ON ur.user_id = u.id
    JOIN role_permissions rp ON rp.role_id = ur.role_id
    JOIN permissions p ON p.id = rp.permission_id
    WHERE u.email = ?
    ORDER BY p.code
  `
  )
  .all("alice@example.com")
  .map((row) => row.code);

assert.deepEqual(alicePermissions, ["device:read", "device:write", "user:read", "user:write"]);

const menuCount = db.prepare("SELECT COUNT(*) AS count FROM menus").get().count;
assert.equal(menuCount, 2);

console.log("06-db-schema-admin smoke test passed.");
