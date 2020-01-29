import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import FriendList from './components/friends';
import FriendRequests from './components/friend-requests';
import Group from './components/groups/show';
import GroupList from './components/groups';
import Home from './components/home';
import Navbar from './components/navbar/bar';
import Post from './components/posts/show';
import Profile from './components/profile';
import React from 'react';
import Signin from './components/session/signin';
import Signup from './components/session/signup';
import NotFound from "./components/404";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { userId: localStorage.getItem('userId')};
  }

  userLoggedIn = (id, name, token) => {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
    this.setState({ userId: id, userName: name });
    
  };

  render() {
    return (
      localStorage.getItem('loggedIn') === 'true' ? <div>
        <Navbar userId={this.state.userId}/>
  
        <BrowserRouter>
          <Switch>
            <Route
              component={() => <Home userId={this.state.userId} />}
              exact
              path={'/'}
            />
            <Route
              component={(props) => <Post {...props} userId={this.state.userId} />}
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
            <Route exact
                   path={'/register'}
            >
              <Redirect to='/' />
            </Route>
            <Route
              exact
              path={'/login'}
            >
              <Redirect to='/' />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div> : <BrowserRouter>
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
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }

}
