var neo4j = require('neo4j-driver')
var fs = require('fs')

var driver = neo4j.driver(
    'bolt://localhost',
    neo4j.auth.basic('neo4j', 'admin')
)

var session = driver.session()

async function create_city(session, city){
    session.writeTransaction( async trans => {
        var ret = await trans.run(
            'CREATE (c:City {id: $id, name: $name}) RETURN c', {
                id: parseInt(city.id),
                name: city.name
            }
        )
        return ret[0].get('c').properties
    })
}



fs.readFile('neo4j/json-data/cities.json', (err, data) => {
    if (err){
        console.log(err)
        return;
    }

    let cities = JSON.parse(data)

    cities.forEach(async city => {
        var ret = await create_city(session, city)
        console.log(ret)
    })
})
