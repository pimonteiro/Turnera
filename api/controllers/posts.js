const Posts = module.exports;

const dbDriver = require('../dbDriver');

Posts.showPost = async (session, req, res) => {
  const post = await dbDriver.exec(session,
    "MATCH l=(u:User)-[:post]-(p:Post {id: $id}) RETURN l",
    { id: req.params.id });
  
  const postJson = post.records[0].get('l').end.properties;
  postJson.owner = post.records[0].get('l').start.properties;
  
  res.jsonp(postJson);
};