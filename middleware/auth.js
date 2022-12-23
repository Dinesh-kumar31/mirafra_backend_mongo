const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
  
    if (!token) {
       return res.json({status: 403, message: "A token is required"})
    }
    try {
      const decoded = jwt.verify(token, 'A@B#C$D%');
      req.user = decoded;
    } catch (err) {
      return res.json({status: 401, message: "A token Expired"})
    }
    return next();
  };

  module.exports = {
    verifyToken
};