const { db } = require("../db/database");

function listRoles() {
  return db.prepare("SELECT id, code, name FROM roles ORDER BY code").all();
}

function listPermissions() {
  return db.prepare("SELECT id, code, name FROM permissions ORDER BY code").all();
}

module.exports = {
  listRoles,
  listPermissions,
};
