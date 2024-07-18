const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const AuthMiddleware = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Access denied: No token provided');
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      if (!roles.includes(decoded.role)) {
        return res.status(403).send('Access denied: Unauthorized role');
      }

      next();
    } catch (err) {
      console.error('JWT verification error:', err);
      return res.status(401).send('Access denied: Invalid token');
    }
  };
};

module.exports = AuthMiddleware;
