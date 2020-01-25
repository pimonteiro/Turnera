import './bar.css';

import { FaSearch } from 'react-icons/fa';
import { MdGroup, MdGroupAdd, MdPerson } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import TransitionsModal from './transitions-modal';

const usersSearchResults = [
  {
    email: 'dmcmurthy0@prlog.org',
    gender: 'Female',
    home_town: 80,
    id: 'd83b49b9-9cd0-4235-b145-efb790741832',
    image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
    lives_in: 86,
    name: 'Dosi McMurthy'
  },
  {
    email: 'jbodechon1@hhs.gov',
    gender: 'Male',
    home_town: 93,
    id: '134dc87a-cb43-4943-931f-2f1eafc25309',
    image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
    lives_in: 68,
    name: 'Jeromy Bodechon'
  }
];

const postsSearchResults = [
  {
    group: '5700a8d1-fd10-4517-9c58-a6a7ae37f2b1',
    hashtags: ['post', 'teste', 'daw'],
    id: '687f0ab9-5089-45a9-99c7-e2e56fc9aa92',
    likes: [],
    owner: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'João Vilaça'
    },
    text: 'Post nº1'
  }
];

const groupsSearchResults = [];

export default class Bar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '1ad231-3123-33131dd',
      name: 'João Vilaça',
      search: false
    };
  }

  onSearch = () => {
    this.setState({
      search: true
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
          groupsSearchResults={groupsSearchResults}
          postsSearchResults={postsSearchResults}
          state={this.state.search}
          usersSearchResults={usersSearchResults}
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
                placeholder={'Search'}
                type={'text'}
              />
              <Button
                onClick={this.onSearch}
                variant={'outline-info'}
              ><FaSearch /></Button>
            </Form>

            <Nav className={'ml-auto mr-xl-5'}>
              <Nav.Link href={`/users/${this.state.id}`}><MdPerson size={40} /> {this.state.name}</Nav.Link>
              <Nav.Link href={`/users/${this.state.id}/friends-request`}><MdGroupAdd size={40} /></Nav.Link>
              <Nav.Link href={`/users/${this.state.id}/groups`}><MdGroup size={40} /></Nav.Link>
            </Nav>
          </Navbar>
        </div>
      </div>
    );
  }

}
