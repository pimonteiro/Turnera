const UserFriendRequests = module.exports;

UserFriendRequests.createUserFriendRequest = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id }), (f:User { id: $fid }) \
    CREATE (u)-[:friend_request]->(f) \
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

UserFriendRequests.indexUserFriendRequests = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id })-[:friend_request]-(f:User) RETURN f",
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

UserFriendRequests.deleteUserFriendRequest = (session, req, res) => {
  session.run(
    "MATCH (u:User { id: $id })-[r:friend_request]-(f:User { id: $fid }) DELETE r",
    { id: req.params.id, fid: req.params.fid }
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
