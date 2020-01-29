const GroupPosts = module.exports;
const uuid4 = require('uuid4')

GroupPosts.createGroupPost = (session, req, res) => {
  req.body.id = uuid4();
  req.body.date = new Date().getTime();
  
  let uid = req.body.user;
  delete req.body.user;
  
  session.run(
    "MATCH (u:User { id: $uid }), (g:Group { id: $gid }) \
    CREATE (p:Post $post) \
    CREATE (u)-[:post]->(p) \
    CREATE (g)-[:post]->(p) \
    RETURN p",
    { gid: req.params.id, post: req.body, uid: uid }
    )
    .then(data => {
      res.jsonp(data.records[0].get('p').properties)
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};

GroupPosts.indexGroupPost = (session, req, res) => {
  session.run(
    "MATCH (g:Group { id: $id })-[:post]-(p:Post), \
    (u:User)-[:post]-(p) \
    RETURN p, u",
    { id: req.params.id }
    )
    .then(data => {
      let ret = [];
      
      data.records.forEach(record => {
        let post = record.get('p').properties;
        let user = {};
        
        user = record.get('u').properties;
        
        post.owner = user;
        
        ret.push(post)
      });
      
      res.jsonp(ret)
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};

GroupPosts.showGroupPost = (session, req, res) => {
  console.log(req.params);
  console.log('AQUI')
  session.run(
    'MATCH (p:Post { id: $pid })-[r]-(a) RETURN p, r, a',
    { pid: req.params.id }
  )
    .then(data => {
      var ret = data.records[0].get('p').properties;

      ret.group = '';

      var likes = [];
      var comments = [];

      data.records.forEach(record => {
        if (record.get('r').type === 'post') {
          if (record.get('a').labels[0] === 'User') {
            var owner = {};

            owner.name = record.get('a').properties.name;
            owner.id = record.get('a').properties.id;
            owner.image = record.get('a').properties.image

            ret.owner = owner;
          } else {ret.group = record.get('a').properties;}
        } else if (record.get('r').type === 'likes') {
          var like = {};

          like.name = record.get('a').properties.name;
          like.id = record.get('a').properties.id;

          likes.push(like);
        } else if (record.get('r').type === 'comment') {
          var comment = {};

          comment = record.get('r').properties;
          comment.owner = record.get('a').properties

          comments.push(comment);
        }
      });
      ret.likes = likes;
      ret.comments = comments;

      res.jsonp(ret);
    })
    .catch(err => {
      console.log(err)
      res.jsonp(err);
    })
    .then(() => {
      session.close();
    });
};

GroupPosts.deleteGroupPost = (session, req, res) => {
  session.run(
    "MATCH (g:Group { id: $id })-[:post]-(p:Post { id: $pid }) \
    DETACH DELETE p",
    { id: req.params.id, pid: req.params.pid }
    )
    .then(() => {
      res.jsonp({'status': 'success'})
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};
