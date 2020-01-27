import { Button, Card, CardActions, CardContent, Grid, Link, Typography } from '@material-ui/core';

import React from 'react';
import axios from 'axios';

const groups = [
  {
    id: '12313132',
    n_members: 20,
    name: 'Associação Académida da Universidade do Minho'
  },
  {
    id: '12313132',
    n_members: 20,
    name: 'Associação Académida da Universidade do Minho'
  },
  {
    id: '12313132',
    n_members: 20,
    name: 'Associação Académida da Universidade do Minho'
  },
  {
    id: '12313132',
    n_members: 20,
    name: 'Associação Académida da Universidade do Minho'
  },
  {
    id: '12313132',
    n_members: 20,
    name: 'Associação Académida da Universidade do Minho'
  },
  {
    id: '12313132',
    n_members: 20,
    name: 'Associação Académida da Universidade do Minho'
  }
];

class GroupList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groups,
      remove_id: ''
    };
    this.removeGroup = this.removeGroup.bind(this);
  }

  removeGroup() {
    axios.delete(`link/'}${this.props.match.userId}/groups/${this.state.remove_id}`)
      .then(() => {
        this.props.history.push(`/${this.props.match.userId}/groups`);
      })
      .catch(res => {
        console.log(res);
      });
  }

  renderGroups() {
    const newlist = [];

    if (groups.length === 0) {
      newlist.push(<h3>Não está em nenhum grupo.</h3>);
    }

    groups.forEach((group, index) =>
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
              <Typography color={'textSecondary'}>
                                Membros: {group.n_members}
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
