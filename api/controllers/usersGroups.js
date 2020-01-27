const UserGroups = module.exports;

UserGroups.create = (session, req, res) => {
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

UserGroups.show = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id })-[:member]-(g:Group { id: $gid }) RETURN g",
    { id: req.params.id, gid: req.params.gid }
    )
    .then(data => {
      res.jsonp(data.records[0].get('g').properties)
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};


UserGroups.index = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id })-[:member]-(g:Group) RETURN g",
    { id: req.params.id }
    )
    .then(data => {
      let ret = [];
      data.records.forEach(record => {
        ret.push(record.get('g').properties)
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

UserGroups.delete = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id })-[r:member]-(g:Group { id: $gid }) DELETE r",
    { id: req.params.id, gid: req.params.gid }
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
