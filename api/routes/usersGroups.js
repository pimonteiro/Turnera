const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const UserGroupsController = require('../controllers/usersGroups');

router.post('/users/:id/groups/:gid', (req, res) => {
  const session = driver.session();
  
  UserGroupsController.create(session, req, res);
});

router.get('/users/:id/groups/:gid', (req, res) => {
  const session = driver.session();
  
  UserGroupsController.show(session, req, res);
});

router.get('/users/:id/groups', (req, res) => {
  const session = driver.session();
  
  UserGroupsController.index(session, req, res);
});

router.delete('/users/:id/groups/:gid', (req, res) => {
  const session = driver.session();
  
  UserGroupsController.delete(session, req, res);
});

module.exports = router;
