// validateVersionField.js

// Middleware to validate the "version" field in the request body
const validateVersionField = (req, res, next) => {
    const { version } = req.body;
  
    // Check if "version" is missing or empty
    if (!version || typeof version !== 'string' || version.trim() === '') {
      return res.status(400).json({ message: 'Invalid or missing "version" field in the request body' });
    }
  
    // If "version" is present and valid, continue to the next middleware or route handler
    next();
  };
  
  module.exports = validateVersionField;
  