const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');

router.post('/signin', (req, res) => {
  AuthController.signin(req, res);
});

router.post('/signup', (req, res) => {
  AuthController.signup(req, res);
});

module.exports = router;
