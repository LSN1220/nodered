const { db } = require("../db/database");

function listDevices() {
  return db
    .prepare(
      `
      SELECT d.id, d.sn, d.name, d.type, d.location, d.created_at,
             s.temperature, s.humidity, s.online, s.last_seen_at
      FROM devices d
      LEFT JOIN device_latest_status s ON s.device_id = d.id
      ORDER BY d.sn
    `
    )
    .all();
}

function findDeviceBySn(sn) {
  return db.prepare("SELECT * FROM devices WHERE sn = ?").get(sn);
}

function createDevice({ sn, name, type, location }) {
  const result = db
    .prepare(
      `INSERT INTO devices (sn, name, type, location)
       VALUES (@sn, @name, @type, @location)`
    )
    .run({ sn, name, type, location });

  return db.prepare("SELECT * FROM devices WHERE id = ?").get(result.lastInsertRowid);
}

function ensureDevice({ sn, name = "Auto registered device", type = "temperature", location = "Unknown" }) {
  const existing = findDeviceBySn(sn);
  return existing || createDevice({ sn, name, type, location });
}

module.exports = {
  listDevices,
  findDeviceBySn,
  createDevice,
  ensureDevice,
};
