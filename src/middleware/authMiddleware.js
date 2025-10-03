const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'User not authenticated' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(403).json({ error: 'User not authenticated' });

  const scheme = parts[0];
  const token = parts[1];

  if (!/^Bearer$/i.test(scheme)) return res.status(403).json({ error: 'User not authenticated' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'User not authenticated' });
    req.user = decoded;
    next();
  });
}

module.exports = { authenticateToken };
