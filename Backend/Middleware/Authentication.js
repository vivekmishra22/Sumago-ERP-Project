const jwt = require('jsonwebtoken');
const secret = 'mysecretkey'; // Ideally from environment variables
const User = require('../Users/user_Model');
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader); // Debugging line

    const token = req.headers['authorization']?.split(' ')[1] || req.headers['Authorization']?.split(' ')[1];
    console.log('Extracted Token:', token); // Debugging line

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token Missing' });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    console.log('Decoded User:', decoded); // Debugging line
    next();
  } catch (error) {
    console.error('Token Verification Error:', error.message);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
