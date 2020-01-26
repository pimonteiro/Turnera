import Avatar from '@material-ui/core/Avatar';
import Card from 'react-bootstrap/Card';
import Grid from '@material-ui/core/Grid';
import React from 'react';

const friendRequests = [
  {
    invited: '493d5869-d0a7-4335-bed3-d68cb1a2aa6f',
    user: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'Márcia Filipa'
    }
  },
  {
    invited: '493d5869-d0a7-4335-bed3-d68cb1a2aa6f',
    user: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'Filipe Monterio'
    }
  },
  {
    invited: '493d5869-d0a7-4335-bed3-d68cb1a2aa6f',
    user: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'Leonardo Neri'
    }
  }
];

export default class FriendRequests extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      friendRequests,
      userId: props.match.params.userId
    };
  }

  renderFriendRequests() {
    const renderedFriendRequests = [];

    this.state.friendRequests.forEach((friendRequest, index) => {
      renderedFriendRequests.push(
        <div key={index}>
          <Card
            className={'mb-5'}
            style={{ fontSize: '20px', width: '80rem' }}
          >
            <Card.Body>
              <div style={{ display: 'inline-flex' }}>
                <Avatar
                  alt={'user_image'}
                  className={'my-3'}
                  src={friendRequest.user.image}
                  style={{ height: '100px', marginRight: '10px', width: '100px' }}
                />
                <a href={`/users/${friendRequest.user.id}`}>
                  <Card.Text style={{ display: 'table-cell', height: '120px', verticalAlign: 'middle' }}>
                    { friendRequest.user.name }
                  </Card.Text>
                </a>
                <a
                  href={`/users/${friendRequest.invited}/friend-requests/${friendRequest.user.id}`}
                  style={{ marginLeft: '80%', position: 'absolute' }}
                >
                  <Card.Text style={{ display: 'table-cell', height: '120px', verticalAlign: 'middle' }}>
                    Aceitar
                  </Card.Text>
                </a>
              </div>
            </Card.Body>
          </Card>
        </div>
      );
    });

    return renderedFriendRequests;
  }

  render() {
    return (
      <Grid
        alignItems={'center'}
        container
        direction={'column'}
        justify={'center'}
      >
        { this.renderFriendRequests() }
      </Grid>
    );
  }

}
