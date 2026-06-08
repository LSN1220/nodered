const { db } = require("../db/database");
const devicesService = require("./devices.service");

const highTemperatureThreshold = 37;

function ingestTelemetry({ deviceSn, temperature, humidity = null, recordedAt }) {
  const transaction = db.transaction(() => {
    const device = devicesService.ensureDevice({
      sn: deviceSn,
      name: `${deviceSn} Sensor`,
      type: "temperature",
      location: "Auto registered",
    });

    db.prepare(
      `
      INSERT INTO telemetry_events (device_id, temperature, humidity, recorded_at)
      VALUES (@deviceId, @temperature, @humidity, @recordedAt)
    `
    ).run({
      deviceId: device.id,
      temperature,
      humidity,
      recordedAt,
    });

    db.prepare(
      `
      INSERT INTO device_latest_status (device_id, temperature, humidity, online, last_seen_at)
      VALUES (@deviceId, @temperature, @humidity, 1, @recordedAt)
      ON CONFLICT(device_id) DO UPDATE SET
        temperature = excluded.temperature,
        humidity = excluded.humidity,
        online = excluded.online,
        last_seen_at = excluded.last_seen_at
    `
    ).run({
      deviceId: device.id,
      temperature,
      humidity,
      recordedAt,
    });

    let alert = null;

    if (temperature >= highTemperatureThreshold) {
      const result = db
        .prepare(
          `
          INSERT INTO alerts (device_id, level, message, temperature)
          VALUES (@deviceId, 'warning', 'Temperature is too high', @temperature)
        `
        )
        .run({
          deviceId: device.id,
          temperature,
        });

      alert = db.prepare("SELECT * FROM alerts WHERE id = ?").get(result.lastInsertRowid);
    }

    return {
      device,
      alert,
    };
  });

  return transaction();
}

function latestTelemetry() {
  return db
    .prepare(
      `
      SELECT d.sn, d.name, d.location, s.temperature, s.humidity, s.online, s.last_seen_at
      FROM device_latest_status s
      JOIN devices d ON d.id = s.device_id
      ORDER BY d.sn
    `
    )
    .all();
}

function listTelemetryEvents({ limit = 20 } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  return db
    .prepare(
      `
      SELECT e.id, d.sn, e.temperature, e.humidity, e.recorded_at
      FROM telemetry_events e
      JOIN devices d ON d.id = e.device_id
      ORDER BY e.id DESC
      LIMIT ?
    `
    )
    .all(safeLimit);
}

module.exports = {
  ingestTelemetry,
  latestTelemetry,
  listTelemetryEvents,
};
