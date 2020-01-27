const Search = module.exports;

Search.searchUser = (session, req, res) => {
  if (!req.body.name)
    req.body.name = "";
  
  if (!req.body.email)
    req.body.email = "";
  
  session.run(
    "MATCH (u:User) WHERE toLower(u.name) CONTAINS toLower($name) \
    AND toLower(u.email) CONTAINS toLower($email) \
    RETURN u",
    { email: req.body.email, name: req.body.name}
    )
    .then(data => {
      let ret = [];
      
      data.records.forEach(record => {
        ret.push(record.get('u').properties)
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

Search.searchPost = (session, req, res) => {
  session.run(
    "MATCH (p:Post) WHERE toLower(p.text) CONTAINS toLower($text) \
    RETURN p",
    { text: req.body.text }
    )
    .then(data => {
      let ret = [];
      
      data.records.forEach(record => {
        ret.push(record.get('p').properties)
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

Search.searchGroup = (session, req, res) => {
  session.run(
    "MATCH (g:Group) WHERE toLower(g.name) CONTAINS toLower($name) \
    RETURN g",
    { name: req.body.name }
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
