const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = async (req, res, next) => {
  const token = req.headers["x-user-token"];
  if (!token) {
    return res.status(400).send("token not Found!!!");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(404).send("Invalid token");
  }
};

module.exports = {
  checkToken,
};
