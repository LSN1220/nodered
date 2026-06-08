const { db } = require("./db");
const { createSchema } = require("./schema");

createSchema();

const latestDeviceStatus = db
  .prepare(
    `
    SELECT d.sn, d.name, dt.name AS type_name, ds.online, ds.last_value, dt.unit, ds.last_seen_at
    FROM devices d
    JOIN device_types dt ON dt.id = d.type_id
    JOIN device_status ds ON ds.device_id = d.id
    ORDER BY d.sn
  `
  )
  .all();

const activeAlerts = db
  .prepare(
    `
    SELECT d.sn, a.message, a.value, a.created_at
    FROM alerts a
    JOIN devices d ON d.id = a.device_id
    WHERE a.resolved_at IS NULL
    ORDER BY a.created_at DESC
  `
  )
  .all();

console.log("Latest device status:");
console.table(latestDeviceStatus);

console.log("Active alerts:");
console.table(activeAlerts);
