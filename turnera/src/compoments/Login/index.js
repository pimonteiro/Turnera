import React, { Component } from "react"
import axios from 'axios'
import auth from '../../auth'

class Login extends Component{
    constructor(props){
      super(props)
    }

    login() {
      axios.get("http://localhost:4444/users")
        .then(res => {
          console.log("Login done!")
          auth.login(() => {
            this.props.history.push("/feed")  
          })
          
        })
        .catch(res => console.log("Login error! -> " + res))
    }

    logout() {
      auth.logout(() => {
        this.props.history.push("/")
      })
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