const express = require("express");
const app = express();
const connect = require("./config/db");
const cors = require("cors");
const { signup, login } = require("./controllers/user.controller");
const { body, validationResult } = require("express-validator");
const productController = require("./controllers/products.controller");
const authenticate = require("./middlwear/authenticate");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/products", authenticate, productController);

app.use(
  "/register",
  body("username").notEmpty().isString().isLength({ min: 3, max: 20 }),
  body("email").isEmail().notEmpty(),
  body("password").isLength({ min: 5, max: 20 }),
  body("phone").isLength(10),
  body("role").notEmpty(),
  signup
);
app.use(
  "/login",
  body("email").isEmail().notEmpty(),
  body("password").isLength({ min: 5, max: 20 }),
  login
);
app.use("/", async (req, res) => {
  res.send("application working");
});

app.listen(port, async () => {
  try {
    await connect();
    console.log("server is running ");
  } catch (err) {
    console.log(err);
  }
});
