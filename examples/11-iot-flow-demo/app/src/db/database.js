const path = require("node:path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "..", "..", "data", "iot-flow.db");
const db = new Database(dbPath);

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");

module.exports = {
  db,
};
