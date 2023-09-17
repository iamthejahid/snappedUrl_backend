const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Replace with your actual secret key

// Middleware function for JWT token verification
async function checkJwtToken(req, res, next) {
  // Extract the token from the request headers
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }


  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    // Verify the token asynchronously and await the result
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    // Token is valid, store the decoded data for later use if needed
    req.user = decoded;
    next();
  } catch (error) {
    // JWT verification failed
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = checkJwtToken;
