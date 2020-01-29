const FeedController = module.exports;

FeedController.index = (session, req, res) => {
    session.run(
        "MATCH (u:User { id: $id })-[:friend]-(f:User)-[:post]-(p:Post) \
        RETURN p as post \
        UNION ALL \
        MATCH (u:User { id: $id })-[:member]-(g:Group)-[:post]-(p:Post) \
        RETURN p as post \
        UNION ALL \
        MATCH (u:User { id: $id })-[:post]-(p:Post) \
        RETURN p as post"
        ,
        { id: req.params.id }
        )
        .then(data => {
            let ret = []

            data.records.forEach(record => {
                ret.push(record.get('post').properties)
            })

            res.jsonp(ret)
        })
        .catch(err => {
            res.jsonp(err)
        })
        .then(() => {
            session.close()
      });
  };