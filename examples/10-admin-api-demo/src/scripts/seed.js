const { db } = require("../db/database");
const { resetSchema } = require("../db/schema");
const { hashPassword } = require("../utils/passwords");

resetSchema();

const insertUser = db.prepare(`
  INSERT INTO users (name, email, password_hash, status)
  VALUES (@name, @email, @passwordHash, @status)
`);

const insertRole = db.prepare("INSERT INTO roles (code, name) VALUES (@code, @name)");
const insertPermission = db.prepare(
  "INSERT INTO permissions (code, name) VALUES (@code, @name)"
);

[
  { code: "admin", name: "Administrator" },
  { code: "operator", name: "Operator" },
  { code: "viewer", name: "Viewer" },
].forEach((role) => insertRole.run(role));

[
  { code: "user:read", name: "Read users" },
  { code: "user:write", name: "Create, update, or delete users" },
  { code: "role:read", name: "Read roles" },
  { code: "log:read", name: "Read operation logs" },
].forEach((permission) => insertPermission.run(permission));

insertUser.run({
  name: "Alice",
  email: "alice@example.com",
  passwordHash: hashPassword("password123"),
  status: "active",
});

insertUser.run({
  name: "Bob",
  email: "bob@example.com",
  passwordHash: hashPassword("password123"),
  status: "active",
});

const userByEmail = db.prepare("SELECT id FROM users WHERE email = ?");
const roleByCode = db.prepare("SELECT id FROM roles WHERE code = ?");
const permissionByCode = db.prepare("SELECT id FROM permissions WHERE code = ?");

function linkUserRole(email, roleCode) {
  db.prepare("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)").run(
    userByEmail.get(email).id,
    roleByCode.get(roleCode).id
  );
}

function linkRolePermission(roleCode, permissionCode) {
  db.prepare("INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)").run(
    roleByCode.get(roleCode).id,
    permissionByCode.get(permissionCode).id
  );
}

linkUserRole("alice@example.com", "admin");
linkUserRole("bob@example.com", "viewer");

["user:read", "user:write", "role:read", "log:read"].forEach((code) =>
  linkRolePermission("admin", code)
);
["user:read"].forEach((code) => linkRolePermission("viewer", code));

console.log("Admin API demo database seeded successfully.");
