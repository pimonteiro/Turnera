
const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const PostsController = require('../controllers/posts');

router.get('/posts/:id', (req, res) => {
  const session = driver.session();
  
  PostsController.showPost(session, req, res);
});

module.exports = router;
