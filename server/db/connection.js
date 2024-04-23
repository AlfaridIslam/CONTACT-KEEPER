// connection.js

const { createPool } = require("mysql2/promise");
require('dotenv').config();

// Create the connection pool
const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT
});


// Export the pool
module.exports = pool;
