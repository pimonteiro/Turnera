const User = module.exports;

User.showUser = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id }) RETURN u",
    { id: req.params.id }
    )
    .then(data => {
      res.jsonp(data.records[0].get('u').properties)
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};

User.createUser = (session, req, res) => {
  req.body.id = uuid4();
  
  session.run(
    "CREATE (u:User $user) RETURN u",
    { user: req.body }
    )
    .then(data => {
      res.jsonp(data.records[0].get('u').properties)
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};

User.updateUser = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id }) SET u = $user RETURN u",
    { id: req.params.id, user: req.body }
    )
    .then(data => {
      res.jsonp(data.records[0].get('u').properties)
    })
    .catch(err => {
      res.jsonp(err)
    })
    .then(() => {
      session.close()
    })
};

User.deleteUser = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id }) DETACH DELETE u",
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
