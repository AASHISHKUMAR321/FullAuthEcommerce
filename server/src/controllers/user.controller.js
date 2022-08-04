const UserModel = require("../models/user.mode");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const newToken = (user) => {
  return jwt.sign({ user }, "shhhhh");
};

const signup = async (req, res) => {
  try {
    const error = validationResult(req);
    console.log(error.array());
    if (!error.isEmpty()) return res.send({ errors: error.array() });
    let user = await UserModel.findOne({ email: req.body.email }).lean().exec();

    if (user) {
      return res.send("email is already  register");
    }
    user = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(String(req.body.password)),
      phone: req.body.phone,
      role: req.body.role,
    });

    const { username, email } = user;

    res.send({ email, username });
  } catch (err) {
    console.log(err.message);
  }
};
const login = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) return res.send({ errors: error.array() });
    let user = await UserModel.findOne({ email: req.body.email }).lean().exec();
    if (!user) return res.send("email is Wrong");
    console.log(user.password, req.body.password);
    const match = bcrypt.compareSync(String(req.body.password), user.password);
    if (!match) return res.send("password is Wrong");
    let token = newToken(user);
    const { username, email, phone, role } = user;

    res.send({ email, username, token, phone, role });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { signup, login };
