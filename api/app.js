const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const groups = require('./routes/groups');
const groupsPosts = require('./routes/groupsPosts');
const postsComments = require('./routes/postsComments');
const postsLikes = require('./routes/postsLikes');
const search = require('./routes/search');
const users = require('./routes/users');
const usersFriendRequests = require('./routes/usersFriendRequests');
const usersFriends = require('./routes/usersFriends');
const usersGroups = require('./routes/usersGroups');
const usersPosts = require('./routes/usersPosts');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', groups);
app.use('/api', groupsPosts);
app.use('/api', postsComments);
app.use('/api', postsLikes);
app.use('/api', search);
app.use('/api', users);
app.use('/api', usersFriendRequests);
app.use('/api', usersFriends);
app.use('/api', usersGroups);
app.use('/api', usersPosts);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })});

module.exports = app;
