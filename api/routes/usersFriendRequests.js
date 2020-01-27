const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const UserFriendRequestsController = require('../controllers/usersFriendRequests');

router.post('/users/:id/friend-requests/:fid', (req, res) => {
  const session = driver.session();
  
  UserFriendRequestsController.createUserFriendRequest(session, req, res);
});

router.get('/users/:id/friend-requests', (req, res) => {
  const session = driver.session();
  
  UserFriendRequestsController.indexUserFriendRequests(session, req, res);
});

router.delete('/users/:id/friend-requests/:fid', (req, res) => {
  const session = driver.session();
  
  return UserFriendRequestsController.deleteUserFriendRequest(session, req, res);
});

module.exports = router;
