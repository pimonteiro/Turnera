import { Avatar, Button, Card, CardActions, CardContent, Grid, Link, Typography } from '@material-ui/core';

import React from 'react';
import axios from 'axios';

const friends = [
  {
    id: 1,
    name: 'Filipe Monteiro'
  },
  {
    id: 2,
    name: 'Márcia Weeb'
  }
];

class FriendList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      friends,
      remove_id: ''
    };
    this.removeFriend = this.removeFriend.bind(this);
  }

  removeFriend() {
    axios.delete(`api/users/${this.props.match.userId}/friends/${this.state.remove_id}`)
      .then(() => {
        this.props.history.push(`/${this.props.match.userId}/groups`);
      })
      .catch(res => {
        console.log(res);
      });
  }

  renderFriends() {
    const newlist = [];

    if (friends.length === 0) {
      newlist.push(<h3>Sem amigos.</h3>);
    }

    friends.forEach((friend, index) =>
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
              <Button onClick={this.removeFriend}>Remove</Button>
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
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography component={'h1'}
              variant={'h3'}
            >
                            Amigos
            </Typography>
            <br/>
          </Grid>
          {this.renderFriends()}
        </Grid>
      </div>
    );
  }

}

export default FriendList;
