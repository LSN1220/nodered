const { db } = require("../db/database");

function createOperationLog({ actorUserId, action, resource, detail }) {
  db.prepare(
    `INSERT INTO operation_logs (actor_user_id, action, resource, detail)
     VALUES (@actorUserId, @action, @resource, @detail)`
  ).run({
    actorUserId,
    action,
    resource,
    detail: detail ? JSON.stringify(detail) : null,
  });
}

function listOperationLogs() {
  return db
    .prepare(
      `
      SELECT l.id, l.action, l.resource, l.detail, l.created_at, u.email AS actor_email
      FROM operation_logs l
      LEFT JOIN users u ON u.id = l.actor_user_id
      ORDER BY l.id DESC
      LIMIT 50
    `
    )
    .all();
}

module.exports = {
  createOperationLog,
  listOperationLogs,
};
