const express = require("express");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const { tokens } = require("./middlewares/get");
const { checkToken } = require("./tokens/checkToken");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

app
  .get("/", checkToken)
  .post("/add", tokens)
  .listen(port, () => {
    console.log(`${port} port started listen`);
  });
