import './bar.css';

import { FaSearch } from 'react-icons/fa';
import { MdGroup, MdGroupAdd, MdPerson } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import { createResource } from '../api-handler';
import { slice } from '../index';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import TransitionsModal from './transitions-modal';

export default class Bar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groupsSearchResults: [],
      id: props.userId,
      name: props.userName,
      postsSearchResults: [],
      search: false,
      searchTerm: '',
      usersSearchResults: []
    };
  }

  onSearch = async () => {
    let usersSearchResults = (await createResource('search/users', { name: this.state.searchTerm })).data;
    let postsSearchResults = (await createResource('search/posts', { text: this.state.searchTerm })).data;
    let groupsSearchResults = (await createResource('search/groups', { name: this.state.searchTerm })).data;

    usersSearchResults = slice(usersSearchResults);
    postsSearchResults = slice(postsSearchResults);
    groupsSearchResults = slice(groupsSearchResults);

    this.setState({
      groupsSearchResults,
      postsSearchResults,
      search: true,
      usersSearchResults
    });
  };

  closeSearch = () => {
    this.setState({
      search: false
    });
  };

  render() {
    return (
      <div>
        <TransitionsModal
          closeSearch={this.closeSearch}
          groupsSearchResults={this.state.groupsSearchResults}
          postsSearchResults={this.state.postsSearchResults}
          state={this.state.search}
          usersSearchResults={this.state.usersSearchResults}
        />
        <div>
          <Navbar className={'color-nav'}
            variant={'dark'}
          >
            <Navbar.Brand href={'/'}>Turnera</Navbar.Brand>

            <Form action={'/api/search/users'}
              className={'centered'}
              inline
            >
              <FormControl className={'mr-sm-2 large'}
                onChange={e => this.setState({ searchTerm: e.target.value })}
                placeholder={'Procura'}
                type={'text'}
              />
              <Button
                onClick={this.onSearch}
                variant={'outline-info'}
              ><FaSearch /></Button>
            </Form>

            <Nav className={'ml-auto mr-xl-5'}>
              <Nav.Link href={`/users/${this.state.id}`}><MdPerson size={40} /> Perfil</Nav.Link>
              <Nav.Link href={`/users/${this.state.id}/friends-requests`}><MdGroupAdd size={40} />Pedidos</Nav.Link>
              <Nav.Link href={`/users/${this.state.id}/groups`}><MdGroup size={40} />Grupos</Nav.Link>
            </Nav>
          </Navbar>
        </div>
      </div>
    );
  }

}
