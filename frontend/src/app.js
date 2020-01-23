import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom"
import Navbar from "./components/navbar/bar";
import Switch from "react-bootstrap/cjs/Switch";
import Login from "./components/session/login";
import Register from "./components/session/register";
import Home from "./components/home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userId: ""
    };
  }

  userLoggedIn = (state) => {
    console.log(`${state.type} ${state.password} ${state.email}`); // GET USER API AND VERIFY CREDENTIALS

    this.setState({
      loggedIn: true,
      userId: "dklafosdhfjlsdk-fsdrfoi2hr23"
    });
  };

  render() {
    return (
      this.state.loggedIn ?
        <Router>
          <Navbar />
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      :
        <Router>
          <Switch>
            <Route path="/">
              <Login callback={this.userLoggedIn} />
            </Route>
            <Route path="/register">
              <Register callback={this.userLoggedIn} />
            </Route>
          </Switch>
        </Router>
    );
  }
}

export default App;
