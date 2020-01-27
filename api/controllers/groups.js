const Groups = module.exports;

Groups.createGroup = (session, req, res) => {
  req.body.id = uuid4();
  
  session.run(
    "CREATE (g:Group $group) RETURN g",
    { group: req.body }
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

Groups.showGroup = (session, req, res) => {
  session.run(
    "MATCH (g:Group { id: $id })-[:member]-(u:User) RETURN g, u",
    { id: req.params.id }
    )
    .then(data => {
      let members = [];
      let ret = data.records[0].get('g').properties;
      
      data.records.forEach(record => {
        members.push(record.get('u').properties.id)
      });
      
      ret.members = members;
      
      res.jsonp(ret)
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};

Groups.deleteGroup = (session, req, res) => {
  session.run(
    "MATCH (g:Group { id: $id }) DETACH DELETE g",
    { id: req.params.id }
    )
    .then(data => {
      res.jsonp({'status': 'success'})
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};

Groups.updateGroup = (session, req, res) => {
  session.run(
    "MATCH (g:Group { id: $id }) SET g = $group RETURN g",
    { id: req.params.id, group: req.body }
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
