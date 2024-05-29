const jwt = require("jsonwebtoken");
const { add, search } = require("../database/user");
const hashing = require("../hash");
function checker(pass) {
  if (pass.length >= 10)
    throw new Error("Parol 10 ta belgidan oshmasligi kerak!");
  return true;
}
async function tokens(req, res, next) {
  //req ga obekt berib yana obekt qilib parol va loginni beradi
  const { login, parol } = req.body;
  checker(parol);
  try {
    if (await search(login)) {
      return res
        .status(500)
        .json("Foydalanuvchi ma'lumotlari ma'lumotlar bazasida mavjud ");
    }
    const hashedPassword = await hashing(parol);
    const result = await add(login, hashedPassword);
    const userId = result.rows[0];
    const token = jwt.sign({ id: userId.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3m",
    });

    res
      .header("x-user-token", token)
      .status(201)
      .json("Token yuborildi. Foydalanuvchi muvaffaqiyatli qo'shildi.");
    next();
  } catch (err) {
    return next(err);
  }
}
module.exports = {
  tokens,
  checker,
};
