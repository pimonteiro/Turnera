const UserPosts = module.exports;

UserPosts.createUserPost = (session, req, res) => {
  req.body.id = uuid4();
  req.body.date = new Date().getTime();
  
  session.run(
    "MATCH (u:User { id: $id }) \
    CREATE (p:Post $post) \
    CREATE (u)-[:post]->(p) \
    RETURN p",
    { id: req.params.id, post: req.body }
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

UserPosts.indexUserPosts = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id })-[:post]-(p:Post) RETURN p",
    { id: req.params.id }
    )
    .then(data => {
      let ret = [];
      
      data.records.forEach(record => {
        ret.push(record.get('p').properties)
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

UserPosts.showUserPost = (session, req, res) => {
  session.run(
    "MATCH (p:Post { id: $pid })-[r]-(a) RETURN p, r, a",
    { pid: req.params.pid }
    )
    .then(data => {
      let ret = data.records[0].get('p').properties;
      ret.group = '';
      
      let likes = [];
      let comments = [];
      
      data.records.forEach(record => {
        if (record.get('r').type === 'post'){
          if(record.get('a').labels[0] === 'User'){
            let owner = {};
            
            owner.name = record.get('a').properties.name;
            owner.id = record.get('a').properties.id;
            
            ret.owner = owner
          }
          else
            ret.group = record.get('a').properties
        }
        else if (record.get('r').type === 'likes'){
          let like = {};
          
          like.name = record.get('a').properties.name;
          like.id = record.get('a').properties.id;
          
          likes.push(like)
        }
        else if (record.get('r').type === 'comment'){
          let comment = {};
          let user = {};
          
          comment.text = record.get('r').properties.text;
          user.name = record.get('a').properties.name;
          user.id = record.get('a').properties.id;
          
          comment.user = user;
          
          comments.push(comment)
        }
      });
      ret.likes = likes;
      ret.comments = comments;
      
      res.jsonp(ret)
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};

UserPosts.deleteUserPost = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id })-[:post]-(p:Post { id: $pid }) \
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
