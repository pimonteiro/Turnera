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
