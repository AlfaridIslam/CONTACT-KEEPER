const pool = require("../db/connection");

const authUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Auth token required..!!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decodedToken; // Assuming the JWT payload contains 'id' instead of '_id'

    // Replace this line with your SQL query
    // const query = `SELECT id FROM users WHERE id = ?`;
    // const [user] = await pool.query(query, [id]); 

    if (!user) {
      return res.status(401).json({ error: "Invalid user ID from token" });
    }

    req.user = user; // Store the user in req.user
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized..!!" });
  }
};
