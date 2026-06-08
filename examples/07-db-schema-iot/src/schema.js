const { db } = require("./db");

function createSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS device_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      unit TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sn TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      type_id INTEGER NOT NULL,
      location TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (type_id) REFERENCES device_types(id)
    );

    CREATE TABLE IF NOT EXISTS device_status (
      device_id INTEGER PRIMARY KEY,
      online INTEGER NOT NULL CHECK (online IN (0, 1)),
      last_value REAL,
      last_seen_at TEXT,
      FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS device_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id INTEGER NOT NULL,
      event_type TEXT NOT NULL,
      value REAL NOT NULL,
      recorded_at TEXT NOT NULL,
      FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS alert_rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_type_id INTEGER NOT NULL,
      metric TEXT NOT NULL,
      operator TEXT NOT NULL CHECK (operator IN ('>', '>=', '<', '<=')),
      threshold REAL NOT NULL,
      enabled INTEGER NOT NULL CHECK (enabled IN (0, 1)),
      FOREIGN KEY (device_type_id) REFERENCES device_types(id)
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id INTEGER NOT NULL,
      rule_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      value REAL NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      resolved_at TEXT,
      FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
      FOREIGN KEY (rule_id) REFERENCES alert_rules(id)
    );

    CREATE INDEX IF NOT EXISTS idx_device_events_device_time
      ON device_events(device_id, recorded_at);

    CREATE INDEX IF NOT EXISTS idx_alerts_device_created
      ON alerts(device_id, created_at);
  `);
}

function resetSchema() {
  db.exec(`
    DROP TABLE IF EXISTS alerts;
    DROP TABLE IF EXISTS alert_rules;
    DROP TABLE IF EXISTS device_events;
    DROP TABLE IF EXISTS device_status;
    DROP TABLE IF EXISTS devices;
    DROP TABLE IF EXISTS device_types;
  `);

  createSchema();
}

module.exports = {
  createSchema,
  resetSchema,
};
