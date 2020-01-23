import React from "react";
import { Navbar } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { FaSearch } from "react-icons/fa";
import { MdPerson, MdGroup, MdGroupAdd } from "react-icons/md"

import "./bar.css"

export default class Bar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "João Vilaça",
      id: "1ad231-3123-33131dd"
    };
  }

  render() {
    return (
      <Navbar className="color-nav" variant="dark">
        <Navbar.Brand href="/">Turnera</Navbar.Brand>

        <Form inline className="centered" action="/api/search/users">
          <FormControl type="text" placeholder="Search" className="mr-sm-2 large" />
          <Button variant="outline-info" type="submit"><FaSearch/></Button>
        </Form>

        <Nav className="ml-auto mr-xl-5">
          <Nav.Link href={"/users/" + this.state.id}><MdPerson size={40}/> {this.state.name}</Nav.Link>
          <Nav.Link href={"/users/" + this.state.id + "/friends-request"}><MdGroupAdd size={40}/></Nav.Link>
          <Nav.Link href={"/users/" + this.state.id + "/groups"}><MdGroup size={40}/></Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
