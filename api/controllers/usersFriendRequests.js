const UserFriendRequests = module.exports;

const dbDriver = require('../dbDriver');

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

UserFriendRequests.indexUserFriendRequests = async (session, req, res) => {
  const ret = [];
  
  const data = await dbDriver.exec(session,
    "MATCH (f:User)-[:friend_request]->(u:User { id: $id }) RETURN f",
    { id: req.params.id });
  
  data.records.forEach(record => {
    const d = record.get('f').properties;
    
    ret.push(d);
  });
  
  res.jsonp(ret);
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
