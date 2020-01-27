const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const PostLikesController = require('../controllers/postsLikes');

router.post('/posts/:id/like', (req, res) => {
  const session = driver.session();
  
  PostLikesController.createPostLike(session, req, res);
});

module.exports = router;
