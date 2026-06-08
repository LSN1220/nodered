const { db } = require("../db/database");
const { hashPassword } = require("../utils/passwords");

function listUsers({ page = 1, pageSize = 10, status } = {}) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safePageSize = Math.min(Math.max(Number(pageSize) || 10, 1), 50);
  const offset = (safePage - 1) * safePageSize;
  const where = [];
  const params = { limit: safePageSize, offset };

  if (status) {
    where.push("status = @status");
    params.status = status;
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const data = db
    .prepare(
      `SELECT id, name, email, status, created_at, updated_at
       FROM users
       ${whereSql}
       ORDER BY id
       LIMIT @limit OFFSET @offset`
    )
    .all(params);

  const total = db.prepare(`SELECT COUNT(*) AS count FROM users ${whereSql}`).get(params).count;

  return {
    data,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      total,
    },
  };
}

function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

function getUserProfileById(id) {
  const user = db
    .prepare("SELECT id, name, email, status, created_at, updated_at FROM users WHERE id = ?")
    .get(id);

  if (!user) {
    return null;
  }

  const roles = db
    .prepare(
      `
      SELECT r.code, r.name
      FROM roles r
      JOIN user_roles ur ON ur.role_id = r.id
      WHERE ur.user_id = ?
      ORDER BY r.code
    `
    )
    .all(id);

  const permissions = db
    .prepare(
      `
      SELECT DISTINCT p.code, p.name
      FROM permissions p
      JOIN role_permissions rp ON rp.permission_id = p.id
      JOIN user_roles ur ON ur.role_id = rp.role_id
      WHERE ur.user_id = ?
      ORDER BY p.code
    `
    )
    .all(id);

  return {
    ...user,
    roles,
    permissions,
  };
}

function createUser({ name, email, password, status = "active", roleIds = [] }) {
  const transaction = db.transaction(() => {
    const result = db
      .prepare(
        `INSERT INTO users (name, email, password_hash, status)
         VALUES (@name, @email, @passwordHash, @status)`
      )
      .run({
        name,
        email,
        passwordHash: hashPassword(password),
        status,
      });

    const userId = result.lastInsertRowid;
    const linkRole = db.prepare("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)");
    roleIds.forEach((roleId) => linkRole.run(userId, roleId));

    return getUserProfileById(userId);
  });

  return transaction();
}

function updateUser(id, { name, email, status, roleIds = [] }) {
  const transaction = db.transaction(() => {
    db.prepare(
      `UPDATE users
       SET name = @name,
           email = @email,
           status = @status,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = @id`
    ).run({ id, name, email, status });

    db.prepare("DELETE FROM user_roles WHERE user_id = ?").run(id);
    const linkRole = db.prepare("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)");
    roleIds.forEach((roleId) => linkRole.run(id, roleId));

    return getUserProfileById(id);
  });

  return transaction();
}

function deleteUser(id) {
  const result = db.prepare("DELETE FROM users WHERE id = ?").run(id);
  return result.changes > 0;
}

module.exports = {
  listUsers,
  getUserByEmail,
  getUserProfileById,
  createUser,
  updateUser,
  deleteUser,
};
