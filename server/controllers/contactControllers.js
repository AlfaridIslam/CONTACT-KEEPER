const pool = require("../db/connection");

// Get all Data

const getContacts = async (req, res) => {
  try {
    // Query the database to fetch all contacts
    const [rows, fields] = await pool.query("SELECT * FROM contacts");

    // Return the contacts data
    res.status(200).json({ contacts: rows });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single data
const getContact = async (req, res) => {
  try {
    const contact_id = req.params.id;

    // Query the database to fetch the employee data
    const [rows, fields] = await pool.query(
      "SELECT * FROM contacts WHERE id = ?",
      [contact_id]
    );

    // Check if employee data is found
    if (rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Return the employee data
    res.status(200).json(rows[0]); // Assuming there's only one row for the employee
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Post contacts
const createContact = async (req, res) => {
  try {
    const { name, phone_number, email } = req.body;
    // console.log(req.userSession);
    const userSession = req.userSession;
    const user_id = userSession.userId;

    // Execute the INSERT query to add the new employee data to the database
    const [result] = await pool.query(
      "INSERT INTO contacts (name, phone_number, email, user_id) VALUES (?, ?, ?, ?)",
      [name, phone_number, email, user_id]
    );

    // Check if the INSERT operation was successful
    if (result.affectedRows === 1) {
      // Return the newly created employee data
      res.status(201).json({ id: result.insertId, name, phone_number, email });
    } else {
      // If the INSERT operation failed, return an error message
      res.status(400).json({ error: "Failed to create employee" });
    }
  } catch (err) {
    // If an error occurs, return the error message
    res.status(400).json({ error: err.message });
  }
};

// UPDATE/EDIT Record
const editContact = async (req, res) => {
  try {
    const { name, phone_number, email } = req.body; // Changed variable names to match the request body
    const {id} = req.params;
    console.log(name, phone_number, email);

    const userSession = req.userSession;
    const user_id = userSession.userId;

    // Execute the UPDATE query to modify the existing contact data in the database
    const result = await pool.query(
      "UPDATE contacts SET name = ?, phone_number = ?, email = ? WHERE user_id = ? and id = ?",
      [name, phone_number, email, user_id, id] // Changed variable names to match the query parameters
    );
    console.log(result);

    // Check if the UPDATE operation was successful
    if (result[0].affectedRows === 1) {
      // Return the updated contact data
      res.status(200).json({ user_id, name, phone_number, email }); // Changed variable names to match the response JSON
    } else {
      // If the UPDATE operation failed, return an error message
      res.status(400).json({ error: "Failed to update contact" });
    }
  } catch (err) {
    // If an error occurs, return the error message
    res.status(400).json({ error: err.message });
  }
};

// DELETE Record
const deleteContact = async (req, res) => {
  try {
    const {id} = req.params; // Assuming the parameter name is 'id'
    const userSession = req.userSession;
    const user_id = userSession.userId;

    // Execute the DELETE query to remove the contact from the database
    const [result] = await pool.query(
      "DELETE FROM contacts WHERE user_id = ? and id = ?",
      [user_id, id]
    );

    // Check if the DELETE operation was successful
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Contact deleted successfully" });
    } else {
      // If the DELETE operation failed (e.g., contact not found), return an error message
      res.status(404).json({ error: "Contact not found or already deleted" });
    }
  } catch (err) {
    // If an error occurs (e.g., database error), return the error message
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  editContact,
  deleteContact,
};
