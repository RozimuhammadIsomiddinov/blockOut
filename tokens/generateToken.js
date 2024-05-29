// generateToken.js
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = jwt.sign({ id: userId }, req.body.parol, {
      expiresIn: "3m",
    });
    res.header("x-user-token", token).send("token sended" + "\n" + token);
    next();
  } catch (err) {
    return next(err.message);
  }
};
