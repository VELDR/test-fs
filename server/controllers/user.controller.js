const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY, { expiresIn: '1d' });
};

// Get all users
const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

// Get user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

const registerController = async (req, res) => {
  try {
    const user = await userService.register(req.body);

    return res
      .status(201)
      .json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.login(email, password);
    const name = user.name;

    const token = createToken(user._id);

    return res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  registerController,
  loginController,
};
