const PostLikes = module.exports;

PostLikes.createPostLike = (session, req, res) => {
  session.run(
    "MATCH (p:Post { id: $pid }), (u:User { id: $uid}) \
    CREATE (u)-[:likes]->(p)",
    { pid: req.params.id, uid: req.body.user }
    )
    .then(() => {
      res.jsonp({ 'status': 'success' })
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};
