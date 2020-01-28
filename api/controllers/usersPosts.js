const UserPosts = module.exports;
const uuid4 = require('uuid4');
const dbDriver = require('../dbDriver');

const i = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg',
  'https://cdn.collider.com/wp-content/uploads/2017/10/the-gifted-amy-acker-02.jpg',
  'https://i.ytimg.com/vi/7I8OeQs7cQA/maxresdefault.jpg',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326738/a-woman-looking-pensive-because-of-cognitive-dissonance.jpg?w=1155&h=1730'
];

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
    postJson.owner.image = i[Math.floor(Math.random() * i.length)];

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

            ret.owner = owner;
          } else {ret.group = record.get('a').properties;}
        } else if (record.get('r').type === 'likes') {
          const like = {};

          like.name = record.get('a').properties.name;
          like.id = record.get('a').properties.id;

          likes.push(like);
        } else if (record.get('r').type === 'comment') {
          const comment = {};
          const user = {};

          comment.text = record.get('r').properties.text;
          user.name = record.get('a').properties.name;
          user.id = record.get('a').properties.id;

          comment.user = user;

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
