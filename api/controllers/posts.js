const Posts = module.exports;

const dbDriver = require('../dbDriver');

//Posts.showPost = async (session, req, res) => {
//  const post = await dbDriver.exec(session,
//    "MATCH l=(u:User)-[:post]-(p:Post {id: $id}) RETURN l",
//    { id: req.params.id });
//  
//  const postJson = post.records[0].get('l').end.properties;
//  postJson.owner = post.records[0].get('l').start.properties;
//  
//  res.jsonp(postJson);
//};

Posts.showPost = (session, req, res) => {
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