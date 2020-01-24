var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver')
var uuid4 = require('uuid4')

var driver = neo4j.driver(
    'bolt://localhost',
    neo4j.auth.basic('neo4j', 'admin')
)

//                                  ----------------------- USERS ---------------------------
router.post('/users', (req, res, next) => {
    var session = driver.session()

    req.body.id = uuid4()

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
});


router.get('/users/:id', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (u:User { id: $id }) RETURN u",
        { id: req.params.id }
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
});

router.delete('/users/:id', (req, res, next) => {
    var session = driver.session()

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
});

router.put('/users/:id', (req, res, next) => {
    var session = driver.session()

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
});

//                                  ----------------------- USERS/GROUPS ---------------------------

router.post('/users/:id/groups/:gid', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (u:User { id: $id }), (g:Group { id: $gid }) \
        CREATE (g)-[:member]->(u) \
        RETURN u",
        { id: req.params.id, gid: req.params.gid }
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
});

router.get('/users/:id/groups/:gid', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (u:User { id: $id })-[:member]-(g:Group { id: $gid }) RETURN g",
        { id: req.params.id, gid: req.params.gid }
    )
    .then(data => {
        res.jsonp(data.records[0].get('g').properties)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});


router.get('/users/:id/groups', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (u:User { id: $id })-[:member]-(g:Group) RETURN g",
        { id: req.params.id }
    )
    .then(data => {
        let ret = []
        data.records.forEach(record => {
            ret.push(record.get('g').properties)
        })
        res.jsonp(ret)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

router.delete('/users/:id/groups/:gid', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (u:User { id: $id })-[r:member]-(g:Group { id: $gid }) DELETE r",
        { id: req.params.id, gid: req.params.gid }
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
});

//                                  ----------------------- USERS/FRIENDS-----------------

router.post('/users/:id/friends/:fid', (req, res, next) => {
    var session = driver.session()

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
});

router.get('/users/:id/friends', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (u:User { id: $id })-[:friend]-(f:User) RETURN f",
        { id: req.params.id }
    )
    .then(data => {
        let ret = []
        data.records.forEach(record => {
            ret.push(record.get('f').properties)
        })
        res.jsonp(ret)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

router.delete('/users/:id/friends/:fid', (req, res, next) => {
    var session = driver.session()

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
});

//                                  ----------------------- USERS/FRIEND-REQUESTS-----------------

router.post('/users/:id/friend-requests/:fid', (req, res, next) => {
    var session = driver.session()

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
});

router.get('/users/:id/friend-requests', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (u:User { id: $id })-[:friend_request]-(f:User) RETURN f",
        { id: req.params.id }
    )
    .then(data => {
        let ret = []
        data.records.forEach(record => {
            ret.push(record.get('f').properties)
        })
        res.jsonp(ret)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

router.delete('/users/:id/friend-requests/:fid', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (u:User { id: $id })-[r:friend_request]-(f:User { id: $fid }) DELETE r",
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
});

//                                  ----------------------- USERS/POSTs-----------------

router.post('/users/:id/friend-requests/:fid', (req, res, next) => {
    var session = driver.session()

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
});

router.get('/users/:id/posts', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (u:User { id: $id })-[:post]-(p:Post), (p)-[r:Comment]-(a:User) RETURN p, a, r",
        { id: req.params.id }
    )
    .then(data => {
        let comments = []
        data.records.forEach(record => {
            console.log(record.get('r').properties.text)
        })
        res.jsonp({})
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

//                                  ----------------------- GROUPS ---------------------------
router.post('/groups', (req, res, next) => {
    var session = driver.session()

    req.body.id = uuid4()

    session.run(
        "CREATE (g:Group $group) RETURN g",
        { group: req.body }
    )
    .then(data => {
        res.jsonp(data.records[0].get('g').properties)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});


router.get('/groups/:id', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (g:Group { id: $id })-[:member]-(u:User) RETURN g, u",
        { id: req.params.id }
    )
    .then(data => {
        let members = []
        let ret = data.records[0].get('g').properties

        data.records.forEach(record => {
            members.push(record.get('u').properties.id)
        })

        ret.members = members

        res.jsonp(ret)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

router.delete('/groups/:id', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (g:Group { id: $id }) DETACH DELETE g",
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
});

router.put('/groups/:id', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (g:Group { id: $id }) SET g = $group RETURN g",
        { id: req.params.id, group: req.body }
    )
    .then(data => {
        res.jsonp(data.records[0].get('g').properties)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

module.exports = router;
