const { db } = require("./db");
const { createSchema } = require("./schema");

createSchema();

function getUserPermissions(email) {
  return db
    .prepare(
      `
      SELECT DISTINCT p.code, p.name
      FROM users u
      JOIN user_roles ur ON ur.user_id = u.id
      JOIN roles r ON r.id = ur.role_id
      JOIN role_permissions rp ON rp.role_id = r.id
      JOIN permissions p ON p.id = rp.permission_id
      WHERE u.email = ?
      ORDER BY p.code
    `
    )
    .all(email);
}

function getVisibleMenus(email) {
  return db
    .prepare(
      `
      SELECT DISTINCT m.title, m.path
      FROM menus m
      JOIN permissions p ON p.id = m.permission_id
      JOIN role_permissions rp ON rp.permission_id = p.id
      JOIN user_roles ur ON ur.role_id = rp.role_id
      JOIN users u ON u.id = ur.user_id
      WHERE u.email = ?
      ORDER BY m.path
    `
    )
    .all(email);
}

const email = "alice@example.com";

console.log(`Permissions for ${email}:`);
console.table(getUserPermissions(email));

console.log(`Visible menus for ${email}:`);
console.table(getVisibleMenus(email));
