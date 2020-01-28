const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const FeedController = require('../controllers/feedController');

router.get('/user_feed/:id', (req, res) => {
    const session = driver.session();
    
    FeedController.index(session, req, res);
});

module.exports = router