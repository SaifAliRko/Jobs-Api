const register = async (req, res) => {
  return res.status(200).send("register successful");
};

const login = async (req, res) => {
  return res.status(200).send("login successful");
};

module.exports = { register, login };
  