module.exports.exec = (session, query, params) => {
  return new Promise(function(resolve, reject) {
    return session.run(query, params)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
      .then(() => {
        session.close();
      })
  });
};
