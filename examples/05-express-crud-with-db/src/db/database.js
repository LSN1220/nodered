const path = require("node:path");
const Database = require("better-sqlite3");

const databasePath = path.join(__dirname, "..", "..", "data", "app.db");
const db = new Database(databasePath);

db.pragma("journal_mode = WAL");

module.exports = {
  db,
};
