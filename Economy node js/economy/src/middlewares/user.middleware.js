const User = require("../models/user.model");

const userMiddleware = async (req, res, next) => {
  try {
    const { phone_number } = req.body;
    const user = await User.findOne({ phone_number });
    if (!user) {
      const { phone_number } = req.body;
      const user = await User.create({ phone_number });
    }
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = userMiddleware;
