const FeedController = module.exports;

FeedController.index = (session, req, res) => {
    session.run(
        "MATCH (u:User { id: $id })-[:friend]-(f:User)-[:post]-(p:Post) \
        RETURN p as post, f as owner \
        UNION ALL \
        MATCH (u:User { id: $id })-[:member]-(g:Group)-[:post]-(p:Post)-[:post]-(f:User) \
        RETURN p as post, f as owner \
        UNION ALL \
        MATCH (u:User { id: $id })-[:post]-(p:Post) \
        RETURN p as post, u as owner"
        ,
        { id: req.params.id }
        )
        .then(data => {
            let ret = []

            data.records.forEach(record => {
                let post = {}

                post = record.get('post').properties
                post.owner = record.get('owner').properties

                ret.push(post)
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