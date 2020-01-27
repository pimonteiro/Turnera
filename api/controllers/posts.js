const Posts = module.exports;

const dbDriver = require('../dbDriver');

Posts.showPost = async (session, req, res) => {
  const post = await dbDriver.exec(session,
    "MATCH l=(u:User)-[:post]-(p:Post {id: $id}) RETURN l",
    { id: req.params.id });
  
  const postJson = post.records[0].get('l').end.properties;
  postJson.owner = post.records[0].get('l').start.properties;
  postJson.owner.image = i[Math.floor(Math.random()*i.length)];
  
  res.jsonp(postJson);
};

const i = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg',
  'https://cdn.collider.com/wp-content/uploads/2017/10/the-gifted-amy-acker-02.jpg',
  'https://i.ytimg.com/vi/7I8OeQs7cQA/maxresdefault.jpg',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326738/a-woman-looking-pensive-because-of-cognitive-dissonance.jpg?w=1155&h=1730'
];
