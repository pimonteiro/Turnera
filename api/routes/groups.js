const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const GroupsController = require('../controllers/groups');

router.post('/groups', (req, res) => {
  const session = driver.session();
  
  GroupsController.createGroup(session, req, res);
});


router.get('/groups/:id', (req, res) => {
  const session = driver.session();
  
  GroupsController.showGroup(session, req, res);
});

router.delete('/groups/:id', (req, res) => {
  const session = driver.session();
  
  GroupsController.deleteGroup(session, req, res)
});

router.put('/groups/:id', (req, res) => {
  const session = driver.session();
  
  GroupsController.updateGroup(session, req, res)
});

module.exports = router;
