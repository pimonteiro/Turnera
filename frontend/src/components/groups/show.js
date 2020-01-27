import { Grid, Paper, TextField } from '@material-ui/core';
import { onChange, useStyles } from '../index';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Feed from '../posts';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { getResource, deleteResource } from '../api-handler';

class Group extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      group: "",
      groupId: props.match.params.groupId,
      userId: props.match.params.userId
    };

    this.exitGroup = this.exitGroup.bind(this);
  }

  exitGroup() {
    deleteResource(`users/${this.state.userId}/groups/${this.state.groupId}`)
      .then(() => {
        this.props.history.push('/posts')
      })
      .catch(res => {
        console.log(res);
      });
  }

  getGroup = async () => {
    return await getResource(`groups/${this.state.groupId}`)  
  }

  componentDidMount() {
    this.getGroup()
      .then(res =>  {
        onChange(this,res.data, 'group')
      })
      .catch(res => {
        console.log(res)
        //This.props.history.push("/404")
      })
  }

  renderMembers(){
    const membersList = [];

    if(this.state.group.members.length === 0){
      membersList.push("Sem membros.")
    }
    
    this.state.group.members.forEach(element => {
      membersList.push(<a href={`/users/${element.id}`}>Temp </a>);
    });

    return membersList
  }

  render() {
    return (
      <Container component={'main'}>
        <CssBaseline />
        <Grid container
          spacing={3}
        >
          <Grid item
            xs={12}
          >
            <img
              alt={'group'}
              src={'https://hackernoon.com/hn-images/1*jFyawcsqoYctkTuZg6wQ1A.jpeg'}
              style={{ height: 200, width: 1215 }}
            />
          </Grid>
          <Grid item
            xs={8}
          >
            <Typography component={'h1'}
              variant={'h3'}
            >
              {this.state.group.name}
            </Typography>
            <Feed />
          </Grid>
          <Grid item
            xs={4}
          >
            <Grid container
              spacing={2}
            >
              <Grid item
                xs={12}
              >
                <div className={useStyles.paper}>
                  <b>Membros</b>
                  <br />
                  <p>
                    {this.renderMembers()}
                  </p>
                </div>
              </Grid>
              <Grid item
                xs={12}
              >
                <div className={useStyles.paper}>
                  <b>Descrição</b>
                  <br />
                  {this.state.descr}
                </div>
                <Button
                  color={'secondary'}
                  onClick={this.exitGroup}
                  variant={'contained'}
                >
                      Sair do Grupo
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }

}

export default Group;
