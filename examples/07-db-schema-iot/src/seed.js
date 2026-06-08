const { db } = require("./db");
const { resetSchema } = require("./schema");

resetSchema();

const insertType = db.prepare(`
  INSERT INTO device_types (code, name, unit)
  VALUES (@code, @name, @unit)
`);

const insertDevice = db.prepare(`
  INSERT INTO devices (sn, name, type_id, location)
  VALUES (@sn, @name, @typeId, @location)
`);

const insertStatus = db.prepare(`
  INSERT INTO device_status (device_id, online, last_value, last_seen_at)
  VALUES (@deviceId, @online, @lastValue, @lastSeenAt)
`);

const insertEvent = db.prepare(`
  INSERT INTO device_events (device_id, event_type, value, recorded_at)
  VALUES (@deviceId, @eventType, @value, @recordedAt)
`);

const insertRule = db.prepare(`
  INSERT INTO alert_rules (device_type_id, metric, operator, threshold, enabled)
  VALUES (@deviceTypeId, @metric, @operator, @threshold, @enabled)
`);

insertType.run({ code: "temperature", name: "Temperature Sensor", unit: "C" });
insertType.run({ code: "power_meter", name: "Power Meter", unit: "kWh" });

const temperatureType = db.prepare("SELECT id FROM device_types WHERE code = ?").get("temperature");
const powerType = db.prepare("SELECT id FROM device_types WHERE code = ?").get("power_meter");

insertDevice.run({
  sn: "TEMP-001",
  name: "Workshop Temperature Sensor",
  typeId: temperatureType.id,
  location: "Workshop A",
});

insertDevice.run({
  sn: "PWR-001",
  name: "Main Power Meter",
  typeId: powerType.id,
  location: "Building 1",
});

const tempDevice = db.prepare("SELECT id FROM devices WHERE sn = ?").get("TEMP-001");
const powerDevice = db.prepare("SELECT id FROM devices WHERE sn = ?").get("PWR-001");

insertStatus.run({
  deviceId: tempDevice.id,
  online: 1,
  lastValue: 38.6,
  lastSeenAt: "2026-06-08T10:00:00.000Z",
});

insertStatus.run({
  deviceId: powerDevice.id,
  online: 1,
  lastValue: 1280.5,
  lastSeenAt: "2026-06-08T10:00:00.000Z",
});

[
  { deviceId: tempDevice.id, eventType: "temperature", value: 35.2, recordedAt: "2026-06-08T09:55:00.000Z" },
  { deviceId: tempDevice.id, eventType: "temperature", value: 38.6, recordedAt: "2026-06-08T10:00:00.000Z" },
  { deviceId: powerDevice.id, eventType: "energy", value: 1280.5, recordedAt: "2026-06-08T10:00:00.000Z" },
].forEach((event) => insertEvent.run(event));

insertRule.run({
  deviceTypeId: temperatureType.id,
  metric: "temperature",
  operator: ">=",
  threshold: 37,
  enabled: 1,
});

const rule = db.prepare("SELECT id FROM alert_rules WHERE metric = ?").get("temperature");

db.prepare(
  `
  INSERT INTO alerts (device_id, rule_id, message, value)
  VALUES (@deviceId, @ruleId, @message, @value)
`
).run({
  deviceId: tempDevice.id,
  ruleId: rule.id,
  message: "Temperature is too high",
  value: 38.6,
});

console.log("IoT schema database seeded successfully.");
