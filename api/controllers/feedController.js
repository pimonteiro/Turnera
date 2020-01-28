const FeedController = module.exports;

FeedController.index = (session, req, res) => {
    session.run(
        "MATCH (u:User { id: $id }), (g:Group { id: $gid }) \
        CREATE (g)-[:member]->(u) \
        RETURN u",
        { id: req.params.id, gid: req.params.gid }
        )
        .then(data => {
            res.jsonp(data.records[0].get('u').properties)
        })
        .catch(err => {
            res.jsonp(err)
        })
        .then(() => {
            session.close()
      });
  };