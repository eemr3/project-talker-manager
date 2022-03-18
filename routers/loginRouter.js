const express = require('express');
const { validateEmail, validatePassword } = require('../middleware/validateLogin');
const generateToken = require('../services/generateToken');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (req, res) => { 
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;