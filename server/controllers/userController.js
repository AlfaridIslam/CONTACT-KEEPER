const User = require("../models/userModel");
const createToken = require("../utils/token");
const pool = require("../db/connection");
// LOGIN AUTH
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (!user) {
      res.status(400).json({ error: err.message });
    }

    const payload = { email: user.email, userId: user.user_id };
    const token = createToken(payload); // Use id for token creation

    res.status(200).json({ id: user.id, token }); // Return id and token
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// SIGNUP
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  // Check if user already exists
  const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (users.length > 0) {
    return res.status(409).json({ error: "Email already in use" }); // Return conflict status if email exists
  }

  try {
    const user = await User.signup(email, password);

    res.status(201).json({ id: user.id }); // Return id
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
