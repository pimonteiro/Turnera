import { Avatar, Button, Card, CardActions, CardContent, Grid, Link, Typography } from '@material-ui/core';

import React from 'react';
import axios from 'axios';
import { getResource, deleteResource } from '../api-handler';
import { onChange } from '..';

class FriendList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      userId: props.match.params.userId
    };
    this.removeFriend = this.removeFriend.bind(this);
  }

  getFriends = async () => {
    return await getResource(`users/${this.state.userId}/friends`)
  }

  componentDidMount(){
    this.getFriends().then(res => {
      onChange(this,res.data,'friends')
    })
  }

  removeFriend(ind) {
    deleteResource(`users/${this.state.userId}/friends/${ind}`)
      .then(res => {
        this.props.history.push(`/${this.state.userId}/friends`);
      })
      .catch(res => {
        console.log(res)
      })
  }

  renderFriends() {
    const newlist = [];

    if (this.state.friends.length === 0) {
      newlist.push(<h3>Sem amigos.</h3>);
    }

    this.state.friends.forEach((friend, index) =>
      newlist.push(
        <Grid item
          key={index}
          xs={1}
        >
          <Card style={{ textAlign: 'center' }}>
            <CardContent>
              <Grid container
                style={{ justifyContent: 'center' }}
              >
                <Grid item
                  xs={12}
                >
                  <Avatar />
                </Grid>
                <Grid item
                  xs={12}
                >
                  <Typography color={'textSecondary'}>
                    <Link href={`/users/${friend.id}`}>
                      {friend.name}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button onClick={this.removeFriend(index)}>Remove</Button>
            </CardActions>
          </Card>
        </Grid>
      )
    );

    return newlist;
  }

  render() {
    return (
      <div>
        <Grid container
          spacing={1}
        >
          <Grid item
            xs={12}
          >
            <Typography component={'h1'}
              variant={'h3'}
            >
                            Amigos
            </Typography>
            <br />
          </Grid>
          {this.renderFriends()}
        </Grid>
      </div>
    );
  }

}

export default FriendList;
