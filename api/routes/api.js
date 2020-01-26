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

//                                  ----------------------- USERS/POSTS-----------------

router.post('/users/:id/posts', (req, res, next) => {
    var session = driver.session()

    req.body.id = uuid4()
    req.body.date = new Date().getTime()

    session.run(
        "MATCH (u:User { id: $id }) \
        CREATE (p:Post $post) \
        CREATE (u)-[:post]->(p) \
        RETURN p",
        { id: req.params.id, post: req.body }
    )
    .then(data => {
        res.jsonp(data.records[0].get('p').properties)
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
        "MATCH (u:User { id: $id })-[:post]-(p:Post) RETURN p",
        { id: req.params.id }
    )
    .then(data => {
        let ret = []

        data.records.forEach(record => {
            ret.push(record.get('p').properties)
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

router.get('/users/:id/posts/:pid', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (p:Post { id: $pid })-[r]-(a) RETURN p, r, a",
        { pid: req.params.pid }
    )
    .then(data => {
        let ret = data.records[0].get('p').properties
        ret.group = ''

        let likes = []
        let comments = []

        data.records.forEach(record => {
            if (record.get('r').type == 'post'){
                if(record.get('a').labels[0] == 'User'){
                    let owner = {}

                    owner.name = record.get('a').properties.name
                    owner.id = record.get('a').properties.id

                    ret.owner = owner
                }
                else 
                    ret.group = record.get('a').properties
            }
            else if (record.get('r').type == 'likes'){
                let like = {}

                like.name = record.get('a').properties.name
                like.id = record.get('a').properties.id

                likes.push(like)
            }
            else if (record.get('r').type == 'comment'){
                let comment = {}
                let user = {}

                comment.text = record.get('r').properties.text
                user.name = record.get('a').properties.name
                user.id = record.get('a').properties.id

                comment.user = user

                comments.push(comment)
            }
        })
        ret.likes = likes
        ret.comments = comments
        
        res.jsonp(ret)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

router.delete('/users/:id/posts/:pid', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (u:User { id: $id })-[:post]-(p:Post { id: $pid }) \
        DETACH DELETE p",
        { id: req.params.id, pid: req.params.pid }
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

//                                  ----------------------- GROUPS/POSTS ---------------------------
router.post('/groups/:id/posts', (req, res, next) => {
    var session = driver.session()

    req.body.id = uuid4()
    req.body.date = new Date().getTime()

    let uid = req.body.user
    delete req.body.user

    session.run(
        "MATCH (u:User { id: $uid }), (g:Group { id: $gid }) \
        CREATE (p:Post $post) \
        CREATE (u)-[:post]->(p) \
        CREATE (g)-[:post]->(p) \
        RETURN p",
        { gid: req.params.id, post: req.body, uid: uid }
    )
    .then(data => {
        res.jsonp(data.records[0].get('p').properties)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

router.get('/groups/:id/posts', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (g:Group { id: $id })-[:post]-(p:Post), \
        (u:User)-[:post]-(p) \
        RETURN p, u",
        { id: req.params.id }
    )
    .then(data => {
        let ret = []

        data.records.forEach(record => {
            let post = record.get('p').properties
            let user = {}

            user.name = record.get('u').properties.name
            user.id = record.get('u').properties.id

            post.user = user

            ret.push(post)
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

router.get('/groups/:id/posts/:pid', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (p:Post { id: $pid })-[r]-(a) RETURN p, r, a",
        { pid: req.params.pid }
    )
    .then(data => {
        let ret = data.records[0].get('p').properties
        let likes = []
        let comments = []

        data.records.forEach(record => {
            if (record.get('r').type == 'post'){
                if(record.get('a').labels[0] == 'User'){
                    let owner = {}

                    owner.name = record.get('a').properties.name
                    owner.id = record.get('a').properties.id

                    ret.owner = owner
                }
                else 
                    ret.group = record.get('a').properties
            }
            else if (record.get('r').type == 'likes'){
                let like = {}

                like.name = record.get('a').properties.name
                like.id = record.get('a').properties.id

                likes.push(like)
            }
            else if (record.get('r').type == 'comment'){
                let comment = {}
                let user = {}

                comment.text = record.get('r').properties.text
                user.name = record.get('a').properties.name
                user.id = record.get('a').properties.id

                comment.user = user

                comments.push(comment)
            }
        })
        ret.likes = likes
        ret.comments = comments
        
        res.jsonp(ret)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

router.delete('/groups/:id/posts/:pid', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (g:Group { id: $id })-[:post]-(p:Post { id: $pid }) \
        DETACH DELETE p",
        { id: req.params.id, pid: req.params.pid }
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

//                                  ----------------------- POSTS ---------------------------
router.post('/posts/:id/like', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (p:Post { id: $pid }), (u:User { id: $uid}) \
        CREATE (u)-[:likes]->(p)",
        { pid: req.params.pid, uid: req.body.user }
    )
    .then(data => {
        res.jsonp({ 'status': 'success' })
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

router.post('/posts/:id/like', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (p:Post { id: $pid }), (u:User { id: $uid}) \
        CREATE (u)-[r:comment { text: $text, date: $date }]->(p) \
        RETURN r",
        { 
            pid: req.params.pid, 
            uid: req.body.user, 
            text: req.body.text,
            date: new Date().getTime() 
        })
    .then(data => {
        res.jsonp(data.records[0].get('r').properties)
    })
    .catch(err => {
        res.jsonp(err)
    })
    .then(() => {
        session.close()
    })
});

//                                  ----------------------- SEARCH ---------------------------
router.post('/search/users', (req, res, next) => {
    var session = driver.session()

    if (!req.body.name)
        req.body.name = ""

    if (!req.body.email)
        req.body.email = ""

    session.run(
        "MATCH (u:User) WHERE toLower(u.name) CONTAINS toLower($name) \
        AND toLower(u.email) CONTAINS toLower($email) \
        RETURN u",
        { email: req.body.email, name: req.body.name}
    )
    .then(data => {
        let ret = []

        data.records.forEach(record => {
            ret.push(record.get('u').properties)
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

router.post('/search/posts', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (p:Post) WHERE toLower(p.text) CONTAINS toLower($text) \
        RETURN p",
        { text: req.body.text }
    )
    .then(data => {
        let ret = []

        data.records.forEach(record => {
            ret.push(record.get('p').properties)
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

router.post('/search/groups', (req, res, next) => {
    var session = driver.session()

    session.run(
        "MATCH (g:Group) WHERE toLower(g.name) CONTAINS toLower($name) \
        RETURN g",
        { name: req.body.name }
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

module.exports = router;
