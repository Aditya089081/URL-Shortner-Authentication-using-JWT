
// Links database
// config/dbClient.js
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root", // your password
  database: "url_shortner_db", // ✅ same DB for both
});

// Use this in all models
