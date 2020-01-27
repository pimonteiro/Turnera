const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const GroupPostsController = require('../controllers/groupsPosts');

router.post('/groups/:id/posts', (req, res) => {
  const session = driver.session();
  
  GroupPostsController.createGroupPost(session, req, res);
});

router.get('/groups/:id/posts', (req, res) => {
  const session = driver.session();
  
  GroupPostsController.indexGroupPost(session, req, res);
});

router.get('/groups/:id/posts/:pid', (req, res) => {
  const session = driver.session();
  
  GroupPostsController.showGroupPost(session, req, res);
});

router.delete('/groups/:id/posts/:pid', (req, res) => {
  const session = driver.session();
  
  GroupPostsController.deleteGroupPost(session, req, res);
});

module.exports = router;
