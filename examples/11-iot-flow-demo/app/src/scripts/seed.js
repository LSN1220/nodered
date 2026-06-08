const { db } = require("../db/database");
const { resetSchema } = require("../db/schema");

resetSchema();

const insertDevice = db.prepare(`
  INSERT INTO devices (sn, name, type, location)
  VALUES (@sn, @name, @type, @location)
`);

[
  {
    sn: "TEMP-001",
    name: "Workshop Temperature Sensor",
    type: "temperature",
    location: "Workshop A",
  },
  {
    sn: "TEMP-002",
    name: "Warehouse Temperature Sensor",
    type: "temperature",
    location: "Warehouse B",
  },
].forEach((device) => insertDevice.run(device));

console.log("IoT flow demo database seeded successfully.");
