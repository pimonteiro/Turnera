import React, { Component } from "react"
import axios from "axios";
import config from '../../config'

class Feed extends Component{
    constructor(props){
      super(props)

      this.content = {
        posts: null
      }
    }


    getPosts() {
      var session = localStorage.getItem('session')
      axios.get(config.apiURL + "/users/" + session._id + "/posts")
        .then(res => this.content.posts = res)
        .catch(res => console.log(res))
    }

    render() {
        return (
          <div>
            <h1>Feed Component</h1>
          </div>
        );
      }
}






export default Feed;