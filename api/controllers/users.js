const User = module.exports;

const dbDriver = require('../dbDriver');

const i = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg',
  'https://cdn.collider.com/wp-content/uploads/2017/10/the-gifted-amy-acker-02.jpg',
  'https://i.ytimg.com/vi/7I8OeQs7cQA/maxresdefault.jpg',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326738/a-woman-looking-pensive-because-of-cognitive-dissonance.jpg?w=1155&h=1730'
];

User.showUser = async (session, req, res) => {
  const data = await dbDriver.exec(session,
    "MATCH (u:User { id: $id }) RETURN u",
    { id: req.params.id });
  
  const ret = data.records[0].get('u').properties;
  ret.image = i[Math.floor(Math.random()*i.length)];
  
  res.jsonp(ret);
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
