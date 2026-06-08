const { db } = require("../db/database");
const { createSchema } = require("../db/schema");

createSchema();

db.exec("DELETE FROM users;");

const insertUser = db.prepare(`
  INSERT INTO users (name, email, role)
  VALUES (@name, @email, @role)
`);

[
  { name: "Alice", email: "alice@example.com", role: "admin" },
  { name: "Bob", email: "bob@example.com", role: "editor" },
  { name: "Carol", email: "carol@example.com", role: "viewer" },
].forEach((user) => insertUser.run(user));

console.log("Database seeded successfully.");
