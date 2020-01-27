import { Button, Card, CardActions, CardContent, Grid, Link, Typography } from '@material-ui/core';

import React from 'react';
import { getResource, deleteResource } from '../api-handler';
import { onChange } from '..';

class GroupList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      userId: props.match.params.userId
    };
    this.removeGroup = this.removeGroup.bind(this);
  }

  removeGroup = async (ind) => {
    console.log("Group to remove: " + ind)
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
          xs={1}
        >
          <Card style={{ textAlign: 'center' }}>
            <CardContent>
              <Typography color={'textSecondary'}>
                <Link href={`/groups/${group.id}`}>
                  {group.name}
                </Link>
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={this.removeGroup(index)}>Remove</Button>
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
            <Grid container
              spacing={2}
            >
              {this.renderGroups()}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

}

export default GroupList;
