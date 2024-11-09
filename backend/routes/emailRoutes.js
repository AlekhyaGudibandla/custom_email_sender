// backend/routes/emailRoutes.js
const express = require('express');
const Email = require('../models/Email');
const router = express.Router();

// POST /api/emails - Create a new email
router.post('/', async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    const email = new Email({ to, subject, body });
    await email.save();
    res.status(201).json(email);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/emails - Get all emails
router.get('/', async (req, res) => {
  try {
    const emails = await Email.find();
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;