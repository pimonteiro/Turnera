import json
import uuid
from neo4j import GraphDatabase

uri = "bolt://localhost"
driver = GraphDatabase.driver(uri, auth=("neo4j", "admin"))

def create_city(tx, city):
    tx.run(
        "CREATE (c:City {name: $name, id: $id}) RETURN c",
        name = city['name'],
        id = city['id']
    )

def create_cities():
    with driver.session() as session:
        with open('neo4j/json-data/cities.json', 'r') as file:
            cities = json.load(file)
            tx = session.begin_transaction()

            for city in cities:
                print(create_city(tx, city))
            
            tx.commit()

def create_users():
    with driver.session() as session:
        with open('neo4j/json-data/users.json', 'r') as file:
            users = json.load(file)
            tx = session.begin_transaction()

            for user in users:
                print(create_user(tx, user))
            
            tx.commit()

def create_user(tx, user):
    tx.run(
        """
        MATCH (home_town:City {id: $ht_id}), (lives_in:City {id: $liv_id}) 
        CREATE (user:User { 
            id: $id, 
            email: $email, 
            gender: $gender, 
            name: $name 
            })
        CREATE (user)-[:lives_in]->(lives_in)
        CREATE (user)-[:home_town]->(home_town)
        RETURN user
        """,
        name = user['name'],
        email = user['email'],
        gender = user['gender'],
        id = user['id'],
        ht_id = user['home_town'],
        liv_id = user['lives_in']
    )

def create_group(tx, group):
    match = "MATCH (user{n}:User) WHERE user{n}.id = '{id}'\n"
    create = "CREATE (group)-[:member]->(user{n})\n"

    query = ""
    i = 1

    create_list = []
    match_list = []

    group['users'] = list(set(group['users']))

    for user in group['users']:
        match_list.append(match.format(n = i, id = user))
        create_list.append(create.format(n = i))
        i += 1

    for line in match_list:
        query += line

    query += "CREATE (group:Group {name: $name, id: $id})\n"

    for line in create_list:
        query += line
    
    tx.run(
        query,
        name = group['name'],
        id = group['id']
    )


def create_groups():
    with driver.session() as session:
        with open('neo4j/json-data/groups.json', 'r') as file:
            groups = json.load(file)
            tx = session.begin_transaction()

            for group in groups:
                print(create_group(tx, group))
            
            tx.commit()


def create_friendship():
    with driver.session() as session:
        with open('neo4j/json-data/friends.json', 'r') as file:
            rels = json.load(file)
            tx = session.begin_transaction()

            for rel in rels:
                tx.run(
                    """
                    MATCH (a:User {id: $user1}), (b:User {id: $user2})
                    CREATE (a)-[r:friend {since: $since}]->(b)
                    """,
                    user1 = rel['user1'],
                    user2 = rel['user2'],
                    since = rel['since']
                )

            tx.commit()


def create_friend_request():
    with driver.session() as session:
        with open('neo4j/json-data/friend-request.json', 'r') as file:
            frs = json.load(file)
            tx = session.begin_transaction()

            for fr in frs:
                tx.run(
                    """
                    MATCH (a:User {id: $user}), (b:User {id: $invited})
                    CREATE (a)-[r:friend_request]->(b)
                    """,
                    user = fr['user'],
                    invited = fr['invited']
                )

            tx.commit()

create_friend_request()