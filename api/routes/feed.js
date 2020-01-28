const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const FeedController = require('../controllers/feedController');

router.get('/users/:id/posts', (req, res) => {
    const session = driver.session();
    
    UserPostsController.indexUserPosts(session, req, res);
});