import { Grid, Paper, TextField } from '@material-ui/core';
import { onChange, useStyles } from '../index';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Feed from '../posts/index';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';
import config from '../../config';

class Group extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      descr: '',
      id: '',
      input: {
        file: '',
        text: ''
      },
      members: [],
      name: ''
    };

    this.exitGroup = this.exitGroup.bind(this);
  }

  exitGroup() {
    axios.delete(`${config.apiURL}...`)
      .then(() => {
        this.props.push('/posts');
      })
      .catch(res => {
        console.log(res);
      });
  }

  componentDidMount() {
    const groupId = this.props.match.params.groupId;

    onChange(this, groupId, 'id');
    axios.get(`${config.apiURL}/groups/${this.state.id}`)
      .then(res => {
        // Store received data
        onChange(this, res.data.name, 'name');
        onChange(this, res.data.members, 'members');
      })
      .catch(() => {
        // This.props.history.push("/404")
      });
  }

  render() {
    const membersList = [];

    this.state.members.forEach(element => {
      membersList.push(<a href={'linktomember'}>{element} </a>);
    });

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
              {this.state.name}
            </Typography>
            <Paper>
              <TextField
                fullWidth
                margin={'normal'}
                multiline
                placeholder={'What is in your mind?'}
                rows={2}
                rowsMax={50}
              />
              <Button
                color={'primary'}
                variant={'contained'}
              >Send</Button>
            </Paper>
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
                  <b>Members</b>
                  <br />
                  <p>{membersList}</p>
                </div>
              </Grid>
              <Grid item
                xs={12}
              >
                <div className={useStyles.paper}>
                  <b>Description</b>
                  <br />
                  {this.state.descr}
                    Calendário de Exames: shorturl.at/cfuDP (2019/2020)
                    Material do Curso: https://goo.gl/Gd9r6c (dropbox)

                    Regras de publicação: [CADEIRA] Conteúdo da publicação.
                    "CADEIRA" a usar: Geral, Algebra, Analise, Calculo, EES, LI1, LI2, Logica, PF, PI, SC, TFM, TMD, AlgC, ArqC, CP, CD, Eletro, EE, EA, ISD, LI3, OpUM_Cadeira (Opção UMinho), POO, SO, BD, CG, CC, DSS, LI4, MNONL, MDIO, MEIO, PL, RC, SRCR, SD.
                </div>
                <Button
                  color={'secondary'}
                  onClick={this.exitGroup}
                  variant={'contained'}
                >
                      Exit group
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
