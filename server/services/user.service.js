const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const userValidator = require('../validators/user.validator');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const getAllUsers = async () => {
  const users = await UserModel.find().sort({ createdAt: -1 }); //Sort by newest
  return users;
};

const getUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const user = await UserModel.findById(id);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email: email });
  return user;
};

const register = async (userData) => {
  const { error, value } = userValidator.registerValidator.validate(userData);
  const { name, email, password } = value;
  if (error) {
    throw Error(error.details[0].message);
  }
  const emailExists = await UserModel.findOne({ email });

  if (emailExists) {
    throw Error('Someone already signed up with this email.');
  }
  const hash = await hashPassword(password);

  const user = await UserModel.create({
    name,
    email,
    password: hash,
  });

  return user;
};

const login = async (email, password) => {
  const { error } = userValidator.loginValidator.validate({ email, password });
  if (error) {
    throw Error(error.details[0].message);
  }

  if (!email || !password) {
    throw Error('All fields must be filled.');
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw Error('Incorrect email.');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw Error('Incorrect password.');
  }

  return user;
};

const userService = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  register,
  login,
};

module.exports = userService;
