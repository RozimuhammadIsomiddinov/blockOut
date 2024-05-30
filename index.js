const express = require("express");
require("dotenv").config();
const app = express();
const { getMid } = require("./middlewares/getAll");
const { createMid } = require("./middlewares/createProduct");
const { updateMid } = require("./middlewares/updateProduct");
const { deleteMid } = require("./middlewares/deleteProduct");
const { checkToken } = require("./tokens/checkToken");
const { generete } = require("./tokens/generateToken");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

app
  .get("/products", getMid)
  .post("/getToken", generete)
  .post("/products/add", checkToken, createMid)
  .put("/products/:id", checkToken, updateMid)
  .delete("/products/:id", checkToken, deleteMid)
  .listen(port, () => {
    console.log(`${port} port started listen`);
  });
