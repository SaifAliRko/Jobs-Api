const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  return res.status(200).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  return res.status(StatusCodes.OK).send("login successful");
};

module.exports = { register, login };
