const UserFriendRequests = module.exports;

const dbDriver = require('../dbDriver');

const i = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg',
  'https://cdn.collider.com/wp-content/uploads/2017/10/the-gifted-amy-acker-02.jpg',
  'https://i.ytimg.com/vi/7I8OeQs7cQA/maxresdefault.jpg',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326738/a-woman-looking-pensive-because-of-cognitive-dissonance.jpg?w=1155&h=1730'
];

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
    "MATCH (u:User { id: $id })-[:friend_request]-(f:User) RETURN f",
    { id: req.params.id });
  
  data.records.forEach(record => {
    const d = record.get('f').properties;
    d.image = i[Math.floor(Math.random()*i.length)];
    
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
