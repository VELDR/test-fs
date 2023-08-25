const express = require('express');
const {
  loginController,
  registerController,
  getUsers,
  getUser,
} = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/login', loginController);

router.post('/register', registerController);

module.exports = router;
