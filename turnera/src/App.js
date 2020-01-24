import React from 'react'
import logo from './logo.svg'
import './App.css'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Homepage from './compoments/Homepage/index'
import Group from './compoments/Group/index'
import NotFound from './compoments/404/index'


const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest}
    render = {props => {
      if(localStorage.getItem('loggedIn')){
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
          <Route path="/group/:name" exact component={Group} />

          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
