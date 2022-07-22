const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const register = async (req, res) => {
  // creating a user with .create
  const user = await User.create(req.body);
  return res.status(200).json({ user });
};


const login = async (req, res) => {
  return res.status(StatusCodes.OK).send("login successful");
};

module.exports = { register, login };
