const express =  require("express");

const router = express.Router();

// Require Controllers
const {
    getContacts,
    getContact,
    createContact,
    editContact,
    deleteContact,
} = require("../controllers/contactControllers");

// get entire data

router.get("/", getContacts);

// get single data

router.get("/:id", getContact);

// create record

router.post("/", createContact);

// UPDATE record

router.patch("/:id", editContact);

// DELETE record

router.delete("/:id", deleteContact);

module.exports = router;