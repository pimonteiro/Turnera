import React from 'react'
import logo from './logo.svg'
import './App.css'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import auth from './auth'


import Login from './compoments/Login/index'
import Register from './compoments/Register/index'
import Homepage from './compoments/Homepage/index'
import Profile from './compoments/Profile/index'
import Feed from './compoments/Feed/index'
import Group from './compoments/Group/index'
import NotFound from './compoments/404/index'


const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest}
    render = {props => {
      if(auth.isAuthenticated()){
        return <Component {...props} />
      }
      else{
        return <NotFound {...props}/>
      }
    }} />
  )
}




function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/signup" exact component={Register} />
          <Route path="/signin" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/profile/:name" exact component={Profile} />
          <ProtectedRoute path="/feed" exact component={Feed} />
          <Route path="/group/:name" exact component={Group} />

          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
