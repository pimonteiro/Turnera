import { Button, Card, CardActions, CardContent, Grid, Link, Typography } from '@material-ui/core';

import React from 'react';
import { getResource, deleteResource } from '../api-handler';
import { onChange } from '..';
import NotFound from '../404';

class GroupList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      userId: props.match.params.userId,
      id: props.loggedInUser
    };
    this.removeGroup = this.removeGroup.bind(this);
  }

  removeGroup = async (ind) => {
    this.props.history.push(`/users/${this.state.userId}/groups`)
    return await deleteResource(`users/${this.state.userId}/groups/${ind}`)
  }

  getGroups = async () => {
    return await getResource(`users/${this.state.userId}/groups`)
  }

  componentDidMount() {
    this.getGroups().then(res => {
      onChange(this,res.data, 'groups')
    })
  }


  renderGroups() {
    const newlist = [];
    if (this.state.groups.length === 0) {
      newlist.push(<h3>Não está em nenhum grupo.</h3>);
    }

    this.state.groups.forEach((group, index) =>
      newlist.push(
        <Grid item
          key={index}
          xs={8}
        >
          <Card style={{ textAlign: 'center' }}>
            <CardContent>
              <Typography color={'textSecondary'}>
                <Link href={`/users/${this.state.userId}/groups/${group.id}`}>
                  {group.name}
                </Link>
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={this.removeGroup}>Remove</Button>
            </CardActions>
          </Card>
        </Grid>
      )
    );

    return newlist;
  }

  render() {
    if(this.state.id != this.state.userId){
      return(
        <div>
          <NotFound/>
        </div>
      )
    }
    return (
      <div>
        <Grid container
          spacing={2}
        >
          <Grid item
            xs={12}
          >
            <Typography component={'h1'}
              variant={'h3'}
            >
                            Grupos
            </Typography>
            <br/>
            </Grid>
              {this.renderGroups()}

        </Grid>
      </div>
    );
  }

}

export default GroupList;
