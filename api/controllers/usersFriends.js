const UserFriends = module.exports;

UserFriends.createUserFriend = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id }), (f:User { id: $fid }) \
    CREATE (f)-[:friend]->(u) \
    RETURN u",
    { id: req.params.id, fid: req.params.fid }
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

UserFriends.show = (session, req, res) => {
};


UserFriends.indexUserFriend = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id })-[:friend]-(f:User) RETURN f",
    { id: req.params.id }
    )
    .then(data => {
      let ret = [];
      data.records.forEach(record => {
        ret.push(record.get('f').properties)
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

UserFriends.deleteUserFriends = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id })-[r:friend]-(f:User { id: $fid }) DELETE r",
    { id: req.params.id, fid: req.params.fid }
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
