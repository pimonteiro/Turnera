const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const AuthController = require('../controllers/auth');

router.post('/signin', (req, res, next) => {
  AuthController.signin(req, res).catch(() => next(createError(401)));
});

router.post('/signup', (req, res) => {
  AuthController.signup(req, res).catch(() => next(createError(401)));
});

module.exports = router;
