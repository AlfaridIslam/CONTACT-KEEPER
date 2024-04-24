const express = require("express");
const authUser = require("../middleware/userMiddleware");

const router = express.Router();

// Require Controllers
const {
  getContacts,
  getContact,
  createContact,
  editContact,
  deleteContact,
} = require("../controllers/contactControllers");

// for secure routing
router.use(authUser);

// get entire data

router.get("/", authUser, getContacts);

// get single data

router.get("/:id", authUser, getContact);

// create record

router.post("/", authUser, createContact);

// UPDATE record

router.patch("/:id", authUser, editContact);

// DELETE record

router.delete("/:id", authUser, deleteContact);

module.exports = router;
