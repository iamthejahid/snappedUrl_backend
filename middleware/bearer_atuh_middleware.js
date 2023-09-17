const jwt = require('jsonwebtoken');
const secret = 'your-secret-key'; // Replace with your actual secret key

// Middleware function for JWT token verification
function checkJwtToken(req, res, next) {
  // Extract the token from the request headers, query, or cookies
  let token = req.headers.authorization || req.query.token || req.cookies.token;

  // Check for the 'Bearer ' prefix and remove it if present
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7); // Remove 'Bearer ' prefix
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the token
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      // JWT verification failed
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Token is valid, store the decoded data for later use if needed
    req.user = decoded;
    next();
  });
}

module.exports = checkJwtToken;
