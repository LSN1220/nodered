const { db } = require("../db/database");

function listAlerts() {
  return db
    .prepare(
      `
      SELECT a.id, d.sn, a.level, a.message, a.temperature, a.created_at, a.resolved_at
      FROM alerts a
      JOIN devices d ON d.id = a.device_id
      ORDER BY a.id DESC
      LIMIT 50
    `
    )
    .all();
}

module.exports = {
  listAlerts,
};
