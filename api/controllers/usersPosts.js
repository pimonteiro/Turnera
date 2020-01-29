const UserPosts = module.exports;
const uuid4 = require('uuid4');
const dbDriver = require('../dbDriver');

UserPosts.createUserPost = (session, req, res) => {
  req.body.id = uuid4();
  req.body.date = new Date().getTime();

  session.run(
    'MATCH (u:User { id: $id }) CREATE (p:Post $post) CREATE (u)-[:post]->(p) RETURN p',
    { id: req.params.id, post: req.body }
  )
    .then(data => {
      res.jsonp(data.records[0].get('p').properties);
    })
    .catch(err => {
      res.jsonp(err);
    })
    .then(() => {
      session.close();
    });
};

UserPosts.indexUserPosts = async (session, req, res) => {
  const ret = [];

  const data = await dbDriver.exec(session,
    'MATCH l=(u:User {id: $id})-[:post]-(p:Post) RETURN l',
    { id: req.params.id });

  data.records.forEach(record => {
    const postJson = record.get('l').end.properties;

    postJson.owner = record.get('l').start.properties;

    ret.push(postJson);
  });

  res.jsonp(ret);
};

UserPosts.showUserPost = (session, req, res) => {
  console.log(req.params);
  session.run(
    'MATCH (p:Post { id: $pid })-[r]-(a) RETURN p, r, a',
    { pid: req.params.pid }
  )
    .then(data => {
      console.log(data);
      const ret = data.records[0].get('p').properties;

      ret.group = '';

      const likes = [];
      const comments = [];

      data.records.forEach(record => {
        if (record.get('r').type === 'post') {
          if (record.get('a').labels[0] === 'User') {
            const owner = {};

            owner.name = record.get('a').properties.name;
            owner.id = record.get('a').properties.id;
            owner.image = record.get('a').properties.image

            ret.owner = owner;
          } else {ret.group = record.get('a').properties;}
        } else if (record.get('r').type === 'likes') {
          const like = {};

          like.name = record.get('a').properties.name;
          like.id = record.get('a').properties.id;

          likes.push(like);
        } else if (record.get('r').type === 'comment') {
          const comment = {};

          comment.text = record.get('r').properties.text;
          comment.owner = record.get('a').properties

          comments.push(comment);
        }
      });
      ret.likes = likes;
      ret.comments = comments;

      res.jsonp(ret);
    })
    .catch(err => {
      res.jsonp(err);
    })
    .then(() => {
      session.close();
    });
};

UserPosts.deleteUserPost = (session, req, res) => {
  session.run(
    'MATCH (u:User { id: $id })-[:post]-(p:Post { id: $pid }) DETACH DELETE p',
    { id: req.params.id, pid: req.params.pid }
  )
    .then(() => {
      res.jsonp({ status: 'success' });
    })
    .catch(err => {
      res.jsonp(err);
    })
    .then(() => {
      session.close();
    });
};
