const { StatusCode } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  // hashing with bcrypt
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  // creating a temporary object and adding hashed password in it.
  const tempUser = { name, email, password: hashedPassword };
  // creating a user with .create
  const user = new User.create({ ...tempUser });
  return res.status(StatusCode.OK).json({ user });
};

const login = async (req, res) => {
  return res.status(200).send("login successful");
};

module.exports = { register, login };
