const express = require('express');
const router = express.Router();
const uuid4 = require('uuid4');

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const UserPostsController = require('../controllers/usersPosts');

router.post('/users/:id/posts', (req, res) => {
  const session = driver.session();
  
  UserPostsController.createUserPost(session, req, res);
});

router.get('/users/:id/posts', (req, res) => {
  const session = driver.session();
  
  UserPostsController.indexUserPosts(session, req, res);
});

router.get('/users/:id/posts/:pid', (req, res) => {
  const session = driver.session();
  
  UserPostsController.showUserPost(session, req, res);
});

router.delete('/users/:id/posts/:pid', (req, res) => {
  const session = driver.session();
  
  UserPostsController.deleteUserPost(session, req, res);
});

module.exports = router;
