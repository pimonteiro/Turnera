const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const UserController = require('../controllers/users');

router.post('/users', (req, res) => {
  const session = driver.session();
  
  UserController.createUser(session, req, res);
});


router.get('/users/:id', (req, res) => {
  const session = driver.session();
  
  UserController.showUser(session, req, res);
});

router.delete('/users/:id', (req, res) => {
  const session = driver.session();
  
  UserController.deleteUser(session, req, res);
});

router.put('/users/:id', (req, res) => {
  const session = driver.session();
  
  UserController.updateUser(session, req, res);
});

module.exports = router;
