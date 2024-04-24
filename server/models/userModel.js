const bcrypt = require("bcryptjs");
const pool = require("../db/connection");

const saltRounds = 10; // Number of salt rounds for bcrypt

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const signup = async (email, password) => {
  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert new user into database
    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    if (result.affectedRows === 1) {
      return { id: result.insertId }; // Return the id of the new user
    } else {
      throw new Error("Failed to create user: No rows affected");
    }
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Failed to create user: " + err.message);
  }
};

const login = async (email, password) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    const user = rows[0];

    if (!user) {
      throw new Error("Email not found.");
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      throw new Error("Password incorrect.");
    }

    return user; // Return the id of the logged in user
  } catch (err) {
    console.error("Error logging in user:", err);
    throw new Error("Failed to log in user: " + err.message);
  }
};

module.exports = { signup, login };
