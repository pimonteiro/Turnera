import './bar.css';

import { FaSearch } from 'react-icons/fa';
import { MdGroup, MdGroupAdd, MdPerson } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import React from 'react';

export default class Bar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '1ad231-3123-33131dd',
      name: 'João Vilaça'
    };
  }

  render() {
    return (
      <Navbar className={'color-nav'}
        variant={'dark'}
      >
        <Navbar.Brand href={'/'}>Turnera</Navbar.Brand>

        <Form action={'/api/search/users'}
          className={'centered'}
          inline
        >
          <FormControl className={'mr-sm-2 large'}
            placeholder={'Search'}
            type={'text'}
          />
          <Button type={'submit'}
            variant={'outline-info'}
          ><FaSearch /></Button>
        </Form>

        <Nav className={'ml-auto mr-xl-5'}>
          <Nav.Link href={`/users/${this.state.id}`}><MdPerson size={40} /> {this.state.name}</Nav.Link>
          <Nav.Link href={`/users/${this.state.id}/friends-request`}><MdGroupAdd size={40} /></Nav.Link>
          <Nav.Link href={`/users/${this.state.id}/groups`}><MdGroup size={40} /></Nav.Link>
        </Nav>
      </Navbar>
    );
  }

}
