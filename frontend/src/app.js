import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './components/home';
import { createResource } from './components/api-handler';

import FriendList from './components/friends';
import FriendRequests from './components/friend-requests';
import Group from './components/groups/show';
import GroupList from './components/groups';
import Navbar from './components/navbar/bar';
import Post from './components/posts/show';
import Profile from './components/profile';
import React from 'react';
import Signin from './components/session/signin';
import Signup from './components/session/signup';
import Switch from 'react-bootstrap/cjs/Switch';
import NotFound from './components/404';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { userId: localStorage.getItem('userId')};
  }

  userLoggedIn = state => {
    console.log(state)
    createResource(state.type, { email: state.email, password: state.password, name: state.name, gender: state.gender, date: state.date })
      .then(raw => {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('token', raw.data.token);
        localStorage.setItem('userId', raw.data.id);

        this.setState({ userId: raw.data.id, userName: state.name });
      })
      .catch(err => {
        
      })
  };

  render() {
    return (
      localStorage.getItem('loggedIn') === 'true' ? <BrowserRouter>
        <Navbar userId={this.state.userId}/>
        <Switch>
          <Route
            component={Home}
            exact
            path={'/'}
          />
          <Route
            component={Post}
            exact
            path={'/posts/:postId'}
          />
          <Route
            component={(props) => <Group {...props} loggedInUser={this.state.userId} />}
            exact
            path={'/groups/:groupId'}
          />
          <Route
            component={(props) => <Profile {...props} loggedInUser={this.state.userId} />}
            exact
            path={'/users/:userId'}
          />
          <Route
            component={FriendRequests}
            exact
            path={'/users/:userId/friends-requests'}
          />
          <Route
            component={(props) => <GroupList {...props} loggedInUser={this.state.userId} />}
            exact
            path={'/users/:userId/groups'}
          />
          <Route
            component={(props) => <FriendList {...props} loggedInUser={this.state.userId} />}
            exact
            path={'/users/:userId/friends'}
          />
        </Switch>
      </BrowserRouter> : <BrowserRouter>
        <Switch>
        <Route exact
            path={'/register'}
          >
            <Signup callback={this.userLoggedIn}/>
          </Route>
          <Route
            path={'/'}
          >
            <Signin callback={this.userLoggedIn} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

}
