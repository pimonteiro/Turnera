import Avatar from '@material-ui/core/Avatar';
import Card from 'react-bootstrap/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import React from 'react';
import { getResource, createResource } from '../api-handler';
import {onChange} from '../index'

export default class FriendRequests extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      friendRequests: [],
      userId: props.match.params.userId
    };
    this.acceptFriend = this.acceptFriend.bind(this)
  }

  getFriendRequests = async () => {
    return await getResource(`users/${this.state.userId}/friend-requests`);
  };

  acceptFriend = friend => {
    createResource(`users/${friend.invited}/friend-requests/${friend.user.id}`)
      .then(() => {
        this.props.history.push(`/users/${this.state.userId}/friends-requests`);
      })
      .catch(res => {
        console.log(res);
      });
  };

  componentDidMount() {
    this.getFriendRequests()
      .then(res => {
        onChange(this, res.data, 'friendRequests')
      })
      .catch(res => {
        console.log(res);
      });
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
                  src={friendRequest.image}
                  style={{ height: '100px', marginRight: '10px', width: '100px' }}
                />
                <a href={`/users/${friendRequest.id}`}>
                  <Card.Text style={{ display: 'table-cell', height: '120px', verticalAlign: 'middle' }}>
                    { friendRequest.name }
                  </Card.Text>
                </a>
                <a
                  style={{ marginLeft: '80%', position: 'absolute' }}
                >
                  <Card.Text style={{ display: 'table-cell', height: '120px', verticalAlign: 'middle' }}>
                    <Button onClick={this.acceptFriend(friendRequest)}>Aceitar</Button>
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
