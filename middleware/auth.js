const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This gives us access to the user's ID in the next function
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }

}

module.exports = auth;
