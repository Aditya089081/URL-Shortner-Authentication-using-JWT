// model/userModel.js
import { db } from "../config/dbClient.js";

// Get a user by their email
export const getUserByEmail = async (email) => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0];
};


// Get a user by their ID
export const getUserById = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM Users WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] || null;
};

// Create a new user

export const createUser = async ({ name, email, password }) => {
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return result.insertId;
};
