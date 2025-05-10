const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'mysecretkey';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();

  } catch (error) {
    console.error('Token verification failed:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
