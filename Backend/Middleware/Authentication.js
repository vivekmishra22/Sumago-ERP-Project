// const jwt = require('jsonwebtoken');
// const secret = 'mysecretkey'; // Ideally from environment variables
// // const UserModel = require('../Users/user_Model');
// const auth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     console.log('Authorization Header:', authHeader); // Debugging line

//     const token = req.headers['authorization']?.split(' ')[1] || req.headers['Authorization']?.split(' ')[1];
//     console.log('Extracted Token:', token); // Debugging line

//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized - Token Missing' });
//     }

//     const decoded = jwt.verify(token, secret);
//     req.user = decoded;
//     console.log('Decoded User:', decoded); // Debugging line
//     next();
//   } catch (error) {
//     console.error('Token Verification Error:', error.message);
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = auth;



// const auth = async (req, res, next) => {
//   try {
//     // Extract token from the Authorization header
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Unauthorized - Token Missing or Invalid' });
//     }

//     // const token = authHeader.split(' ')[1];
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized - Token Missing' });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, secret);
//     req.user = decoded; // Attach the decoded user data to the request object
//     next();
//   } catch (error) {
//     console.error('Token Verification Error:', error.message);
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired' });
//     }
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = auth;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'mysecretkey'; // Use environment variable for the secret

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized - Token Missing or Invalid' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token Missing' });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error.message);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = auth;