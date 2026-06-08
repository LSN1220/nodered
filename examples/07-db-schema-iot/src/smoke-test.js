const assert = require("node:assert/strict");
const { db } = require("./db");
require("./seed");

const deviceCount = db.prepare("SELECT COUNT(*) AS count FROM devices").get().count;
assert.equal(deviceCount, 2);

const eventCount = db.prepare("SELECT COUNT(*) AS count FROM device_events").get().count;
assert.equal(eventCount, 3);

const activeAlert = db
  .prepare(
    `
    SELECT d.sn, a.message, a.value
    FROM alerts a
    JOIN devices d ON d.id = a.device_id
    WHERE a.resolved_at IS NULL
  `
  )
  .get();

assert.equal(activeAlert.sn, "TEMP-001");
assert.equal(activeAlert.message, "Temperature is too high");

console.log("07-db-schema-iot smoke test passed.");
