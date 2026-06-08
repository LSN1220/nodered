const { db } = require("./db");
const { resetSchema } = require("./schema");

resetSchema();

const insertUser = db.prepare(`
  INSERT INTO users (name, email, status)
  VALUES (@name, @email, @status)
`);

const insertRole = db.prepare(`
  INSERT INTO roles (code, name)
  VALUES (@code, @name)
`);

const insertPermission = db.prepare(`
  INSERT INTO permissions (code, name)
  VALUES (@code, @name)
`);

const insertMenu = db.prepare(`
  INSERT INTO menus (title, path, permission_id)
  VALUES (@title, @path, @permissionId)
`);

const users = [
  { name: "Alice", email: "alice@example.com", status: "active" },
  { name: "Bob", email: "bob@example.com", status: "active" },
  { name: "Carol", email: "carol@example.com", status: "disabled" },
];

const roles = [
  { code: "admin", name: "Administrator" },
  { code: "operator", name: "Operator" },
  { code: "viewer", name: "Viewer" },
];

const permissions = [
  { code: "user:read", name: "Read users" },
  { code: "user:write", name: "Create or update users" },
  { code: "device:read", name: "Read devices" },
  { code: "device:write", name: "Create or update devices" },
];

users.forEach((user) => insertUser.run(user));
roles.forEach((role) => insertRole.run(role));
permissions.forEach((permission) => insertPermission.run(permission));

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
linkUserRole("bob@example.com", "operator");
linkUserRole("carol@example.com", "viewer");

["user:read", "user:write", "device:read", "device:write"].forEach((code) =>
  linkRolePermission("admin", code)
);
["device:read", "device:write"].forEach((code) => linkRolePermission("operator", code));
["user:read", "device:read"].forEach((code) => linkRolePermission("viewer", code));

[
  { title: "Users", path: "/users", permissionCode: "user:read" },
  { title: "Devices", path: "/devices", permissionCode: "device:read" },
].forEach((menu) => {
  insertMenu.run({
    title: menu.title,
    path: menu.path,
    permissionId: permissionByCode.get(menu.permissionCode).id,
  });
});

console.log("Admin schema database seeded successfully.");
