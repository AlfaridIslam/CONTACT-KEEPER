const pool = require("../db/connection"); 

// Define the contacts schema
const contactsSchema = `
  CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;

// Function to create the contacts table if it doesn't exist
const createContactsTable = async () => {
  
  try {
    await pool.query(contactsSchema);
    console.log("Contacts table created successfully or already exists.");
  } catch (error) {
    console.error("Error creating contacts table:", error);
  } finally {
    connection.end();
  }
};

// Function to add a new contact
const addContact = async (name, phone_number, email, user_id) => {
  // const connection = await pool.getConnection();
  try {
    await pool.query(
      "INSERT INTO contacts (name, phone_number, email, user_id) VALUES (?, ?, ?, ?)",
      [name, phone_number, email, user_id]
    );
    console.log("Contact added successfully.");
  } catch (error) {
    console.error("Error adding contact:", error);
  } finally {
    connection.end();
  }
};

// Export the functions and pool
module.exports = { createContactsTable, addContact };
