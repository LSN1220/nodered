const { db } = require("../db/database");
const { createSchema } = require("../db/schema");

createSchema();

function listUsers({ role, page = 1, pageSize = 10 }) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safePageSize = Math.min(Math.max(Number(pageSize) || 10, 1), 50);
  const offset = (safePage - 1) * safePageSize;

  const where = [];
  const params = {
    limit: safePageSize,
    offset,
  };

  if (role) {
    where.push("role = @role");
    params.role = role;
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const rows = db
    .prepare(
      `SELECT id, name, email, role, created_at, updated_at
       FROM users
       ${whereSql}
       ORDER BY id
       LIMIT @limit OFFSET @offset`
    )
    .all(params);

  const total = db.prepare(`SELECT COUNT(*) AS count FROM users ${whereSql}`).get(params).count;

  return {
    data: rows,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      total,
    },
  };
}

function getUserById(id) {
  return db
    .prepare("SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?")
    .get(id);
}

function createUser({ name, email, role }) {
  const result = db
    .prepare(
      `INSERT INTO users (name, email, role)
       VALUES (@name, @email, @role)`
    )
    .run({ name, email, role });

  return getUserById(result.lastInsertRowid);
}

function updateUser(id, { name, email, role }) {
  db.prepare(
    `UPDATE users
     SET name = @name,
         email = @email,
         role = @role,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = @id`
  ).run({ id, name, email, role });

  return getUserById(id);
}

function deleteUser(id) {
  const result = db.prepare("DELETE FROM users WHERE id = ?").run(id);
  return result.changes > 0;
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
