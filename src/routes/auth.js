const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '1h';

router.post('/auth', (req, res) => {
  const { email, password } = req.body || {};
  if (email === 'admin@admin.com' && password === 'admin') {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    return res.status(200).json({ token });
  }
  return res.status(400).json({ error: 'invalid credentials' });
});

module.exports = router;
