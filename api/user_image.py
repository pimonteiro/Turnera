import json
import requests

endpoint = "https://source.unsplash.com/random/900×700/?"
new_users = []

with open('neo4j/json-data/users.json', 'r') as file:
    users = json.load(file)

    for user in users:
        print(user)
        gender = user['gender']
        r = requests.get(endpoint + gender)

        user['image'] = r.url

        new_users.append(user)


with open('neo4j/json-data/users.json', 'w+') as file:
    file.write(json.dumps(new_users, indent=2))