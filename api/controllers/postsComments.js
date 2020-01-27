const PostComments = module.exports;

PostComments.createPostComment = (session, req, res) => {
  session.run(
    "MATCH (p:Post { id: $pid }), (u:User { id: $uid}) \
    CREATE (u)-[r:comment { text: $text, date: $date }]->(p) \
    RETURN r",
    {
      pid: req.params.pid,
      uid: req.body.user,
      text: req.body.text,
      date: new Date().getTime()
    })
    .then(data => {
      res.jsonp(data.records[0].get('r').properties)
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};
