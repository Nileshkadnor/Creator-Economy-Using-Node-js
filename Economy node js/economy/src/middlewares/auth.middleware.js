const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized access");
    }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized access");
  }
  try {
    const verification = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.user_id = verification.id;
    next();
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

module.exports = authMiddleware;
