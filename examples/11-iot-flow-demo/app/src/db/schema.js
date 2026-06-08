const { db } = require("./database");

function createSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sn TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      location TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS telemetry_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id INTEGER NOT NULL,
      temperature REAL NOT NULL,
      humidity REAL,
      recorded_at TEXT NOT NULL,
      FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS device_latest_status (
      device_id INTEGER PRIMARY KEY,
      temperature REAL NOT NULL,
      humidity REAL,
      online INTEGER NOT NULL CHECK (online IN (0, 1)),
      last_seen_at TEXT NOT NULL,
      FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id INTEGER NOT NULL,
      level TEXT NOT NULL CHECK (level IN ('info', 'warning', 'critical')),
      message TEXT NOT NULL,
      temperature REAL NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      resolved_at TEXT,
      FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_telemetry_events_device_time
      ON telemetry_events(device_id, recorded_at);

    CREATE INDEX IF NOT EXISTS idx_alerts_device_created
      ON alerts(device_id, created_at);
  `);
}

function resetSchema() {
  db.exec(`
    DROP TABLE IF EXISTS alerts;
    DROP TABLE IF EXISTS device_latest_status;
    DROP TABLE IF EXISTS telemetry_events;
    DROP TABLE IF EXISTS devices;
  `);

  createSchema();
}

module.exports = {
  createSchema,
  resetSchema,
};
