const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const PostCommentsController = require('../controllers/postsComments');

router.post('/posts/:pid/comment', (req, res, next) => {
  const session = driver.session();
  
  PostCommentsController.createPostComment(session, req, res);
});

module.exports = router;
