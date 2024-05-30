// generateToken.js
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  generete: async (req, res, next) => {
    try {
      const token = jwt.sign({ id: 123 }, process.env.JWT_SECRET_KEY, {
        expiresIn: "3m",
      });
      res.header("x-product-token", token).send("token sended" + "\n" + token);
      next();
    } catch (err) {
      return next(err.message);
    }
  },
};
