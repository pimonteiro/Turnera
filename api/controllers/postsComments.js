const PostComments = module.exports;

PostComments.createPostComment = (session, req, res) => {
  
  session.run(
    "MATCH (p:Post { id: $pid }), (u:User { id: $uid}) \
    CREATE (u)-[r:comment { text: $text, date: $date }]->(p) \
    RETURN r, u",
    {
      pid: req.params.pid,
      uid: req.body.user,
      text: req.body.text,
      date: new Date().getTime()
    })
    .then(data => {
      const c = data.records[0].get('r').properties;
      
      c.owner = data.records[0].get('u').properties;
      c.owner.image =
      
      res.jsonp(c);
    })
    .catch(err => {
      res.jsonp(err);
    })
    .then(() => {
      session.close();
    });
};
