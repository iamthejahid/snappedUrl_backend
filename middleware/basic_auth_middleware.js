const basicAuth = require('basic-auth');

function authenticate(req, res, next) {
  const user = basicAuth(req);
  
  const usernameFromEnv = process.env.BASIC_AUTH_USERNAME;
  const passwordFromEnv = process.env.BASIC_AUTH_PASSWORD;



  if (!user || user.name !== usernameFromEnv || user.pass !== passwordFromEnv) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  }

  // Valid credentials, proceed to the next middleware
  next();
}

module.exports = authenticate;
