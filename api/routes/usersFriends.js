const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const UserFriendsController = require('../controllers/usersFriends');

router.post('/users/:id/friends/:fid', (req, res) => {
  const session = driver.session();
  
  UserFriendsController.createUserFriend(session, req, res);
});

router.get('/users/:id/friends', (req, res) => {
  const session = driver.session();
  
  UserFriendsController.indexUserFriend(session, req, res);
});

router.delete('/users/:id/friends/:fid', (req, res) => {
  const session = driver.session();
  
  UserFriendsController.deleteUserFriends(session, req, res);
});

module.exports = router;
