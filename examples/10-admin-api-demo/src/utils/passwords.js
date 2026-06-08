const crypto = require("node:crypto");

const demoSalt = "admin-api-demo-salt";

function hashPassword(password) {
  // This is intentionally simple for learning. Use bcrypt or argon2 in production.
  return crypto.createHash("sha256").update(`${demoSalt}:${password}`).digest("hex");
}

function verifyPassword(password, passwordHash) {
  return hashPassword(password) === passwordHash;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
