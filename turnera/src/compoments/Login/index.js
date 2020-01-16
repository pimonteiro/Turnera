import React, { Component } from "react"
import axios from 'axios'
import config from '../../config'

class Login extends Component{
    constructor(props){
      super(props)
    }

    login() {
      axios.get(config.apiURL + "")
        .then(res => {
          console.log("Login done!")
          localStorage.setItem('session', res);
          localStorage.setItem('loggedIn',true)
          console.log("Token: " + localStorage.getItem('token'))
          this.props.history.push("/feed")  
        })
        .catch(res => console.log("Login error! -> " + res))
    }

    logout() {
      this.props.history.push("/")
    }

    render() {
        return (
          <div>
            <h1>Login Component</h1>
            <button onClick={this.login.bind(this)}>Login</button>
            <button onClick={this.logout.bind(this)}>Logout</button>
          </div>
        );
      }
}



export default Login;