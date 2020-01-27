const express = require('express');
const router = express.Router();
const uuid4 = require('uuid4');

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const SearchController = require('../controllers/search');

router.post('/search/users', (req, res) => {
  const session = driver.session();
  
  SearchController.searchUser(session, req, res);
});

router.post('/search/posts', (req, res) => {
  const session = driver.session();
  
  SearchController.searchPost(session, req, res)
});

router.post('/search/groups', (req, res) => {
  const session = driver.session();
  
 SearchController.searchGroup(session, req, res)
});

module.exports = router;
