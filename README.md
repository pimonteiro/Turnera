# Turnera

Your social network of choice. *wink wink*



## Routes
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
	  / GET
	  /:post_id GET DELETE POST

/api/users/:user_id/friends
	  / POST GET
	  /:friend_id DELETE

/api/users/:user_id/friends-request
	  / GET POST
	  /:friend-request_id POST DELETE

/api/groups/:groups_id/posts
	  / GET
	  /:post_id GET DELETE POST

/api/search
	  /users POST
	  /posts POST
```
