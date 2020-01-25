import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './components/home';

import Group from './components/group';
import Navbar from './components/navbar/bar';
import Profile from './components/profile';
import React from 'react';
import Signin from './components/session/signin';
import Signup from './components/session/signup';
import Switch from 'react-bootstrap/cjs/Switch';

export default class App extends React.Component {

  userLoggedIn = state => {
    // TODO: GET USER API AND VERIFY CREDENTIALS
    console.log(`${state.type} ${state.password} ${state.email}`);

    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userId', '231mknj4-4hb23423');

    this.setState({});
  };

  render() {
    return (
      localStorage.getItem('loggedIn') === 'true' ? <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path={'/'}><Home /></Route>
          <Route path={'/group/:group_id'}><Group /></Route>
          <Route path={'/users/:user_id'}><Profile /></Route>
        </Switch>
      </BrowserRouter> : <BrowserRouter>
        <Switch>
          <Route path={'/'}>
            <Signup callback={this.userLoggedIn} />
          </Route>
          <Route path={'/register'}>
            <Signin callback={this.userLoggedIn} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

}
