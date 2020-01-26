import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './components/home';

import Group from './components/group';
import GroupList from './components/groups';
import Navbar from './components/navbar/bar';
import Post from './components/posts/show';
import Profile from './components/profile';
import React from 'react';
import Signin from './components/session/signin';
import Signup from './components/session/signup';
import Switch from 'react-bootstrap/cjs/Switch';
import FriendList from './components/friends';

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
          <Route
            component={Home}
            exact
            path={'/'}
          />
          <Route
            component={Post}
            exact
            path={'/posts/:post_id'}
          />
          <Route
            component={Group}
            exact
            path={'/group/:group_id'}
          />
          <Route
            component={Profile}
            exact
            path={'/users/:user_id'}
          />
          <Route
            component={FriendList}
            exact
            path={'/users/:user_id/friends-request'}
          />
          <Route
            component={GroupList}
            exact
            path={'/users/:user_id/groups'}
          />
        </Switch>
      </BrowserRouter> : <BrowserRouter>
        <Switch>
          <Route path={'/'}>
            <Signin callback={this.userLoggedIn} />
          </Route>
          <Route path={'/register'}>
            <Signup callback={this.userLoggedIn} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

}
