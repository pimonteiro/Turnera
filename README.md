# Turnera
Social Netwok project developed for the course *Desenvolvimento de Aplicações Web* (Web App Development).

## API Routes
```text
/signin POST
/signup POST

/api/users
	  /:user_id GET, PUT, DELETE
	  / POST

/api/groups
	  /:group_id GET, PUT, DELETE
	  / POST

/api/users/:user_id/groups
	  / GET
	  /:group_id GET DELETE POST

/api/users/:user_id/posts
	  / GET POST
	  /:post_id GET DELETE

/api/users/:user_id/friends
	  / GET
	  /:friend_id DELETE POST

/api/users/:user_id/friend-requests
	  / GET
	  /:friend_id POST DELETE

/api/groups/:groups_id/posts
	  / GET POST
	  /:post_id GET DELETE

/api/posts/:post_id/like
	  / POST

/api/posts/:post_id/comment
	  / POST

/api/search
	  /users POST
	  /posts POST
	  /groups POST
```

## Running the App
### 1º Start API server
It requires _docker_ and _docker-compose_ to run.
To start it, run the following commands:
```
cd api
npm install
docker-compose up	# start container containing Neo4j
npm start		# start node server
```

### 2º Start React server
```
cd frontend
npm install
npm start
```

The API server **MUST** be started first so the servers use the correct ports for the services.

API server -----> localhost:3000  
React server ---> localhost:3001
