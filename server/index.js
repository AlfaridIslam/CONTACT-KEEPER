require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db/connection"); // Import the connection pool
const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes")

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, async () => {
  try {
    console.log('Connected to database!');
    console.log(`Server is running at PORT:${PORT}`);
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
});
