const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

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
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const feed = require('./routes/feed');
const AuthController = require("./controllers/auth");

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', auth);

app.use((req, res, next) => {
  if (req.query.token === undefined) { //TODO: DONT BREAK DEV
    next();
  }
  
  AuthController.verify(req.query.token)
    .then(value => {
      if(value) {
        next()
      } else {
        next(createError(401));
      }
    });
});

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
app.use('/api', posts);
app.use('/api', feed);


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;
