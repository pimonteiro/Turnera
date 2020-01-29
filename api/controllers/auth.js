const Auth = module.exports;

const dbDriver = require('../dbDriver');
const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');

const key = 'AhPhivoojee9phahcae7mei4ohjeenoo';

const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'admin')
);

const bcrypt = require('bcryptjs');

Auth.signup = async (req, res) => {
  const session = driver.session();

  req.body.id = uuid4();
  req.body.token = jwt.sign(
    { email: req.body.email },
    key,
    { algorithm: 'HS256', expiresIn: '2h'
    }
  );

  req.body.password = bcrypt.hashSync(req.body.password, 6);

  const data = await dbDriver.exec(session, 'CREATE (u:User $user) RETURN u', { user: req.body });

  res.jsonp(data.records[0].get('u').properties);
};

Auth.signin = async (req, res) => {
  const session = driver.session();

  const email = req.body.email;
  const password = req.body.password;

  let data = await dbDriver.exec(session, 'MATCH (u:User { email: $email }) RETURN u', { email });

  if (data.records.length === 0) {
    throw new Error('Wrong Credentials');
  }

  const user = data.records[0].get('u').properties;

  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error('Wrong Credentials');
  }

  const token = jwt.sign(
    { id: req.body.id },
    key,
    { algorithm: 'HS256', expiresIn: '2h'
    });

  data = await dbDriver.exec(
    session,
    'MATCH (u:User { email: $email }) SET u.token = $token RETURN u', { email, token });

  res.jsonp(data.records[0].get('u').properties);
};

Auth.verify = async token => {
  const session = driver.session();

  const data = await dbDriver.exec(session, 'MATCH (u:User { token: $token }) RETURN u', { token });

  return data.records.length > 0;
};
