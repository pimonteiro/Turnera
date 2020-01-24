import React, { Component } from "react"
import Feed from '../Feed/index'

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Grid, Paper} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { useStyles, onChange } from '../index';

import axios from 'axios'
import config from '../../config'

class Group extends Component{
    constructor(props){
      super(props)
      this.state = {
        id: "",
        name: "Teste",
        descr: "",
        members: ["Filipe Monteiro", "João Vilaça", "Leonardo Neri"]
      }
      this.exitGroup = this.exitGroup.bind(this)
    }

    componentDidMount(){
      axios.get(config.apiURL + "/groups/" + this.state.id)
      .then(res => {
          //Store received data
      })
      .catch(res => {
        this.props.history.push("/group/group_not_found")
      })
    }

    exitGroup(){
      axios.delete(config.apiURL + "...")
      .then(res => {
        this.props.push("/feed")
      })
      .catch(res => {
        console.log(res)
      })
    }
  
    render() {
      const members_list = []
      this.state.members.forEach(element => {
      members_list.push(<a href="linktomember">{element} </a>) 
      })

      return (
        <Container component="main">
          <CssBaseline />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <img style={{width:1215,height:200}} src="https://hackernoon.com/hn-images/1*jFyawcsqoYctkTuZg6wQ1A.jpeg"></img>
            </Grid>
            <Grid item xs={8}>
            <Typography component="h1" variant="h3">
              {this.state.name}
            </Typography>
              <Feed />
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className={useStyles.paper}>
                    <b>Membros</b>
                    <br/>
                    <p>{members_list}</p>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className={useStyles.paper}>
                    <b>Description</b>
                    <br/>
                    {this.state.descr}
                    Calendário de Exames: shorturl.at/cfuDP (2019/2020)
                    Material do Curso: https://goo.gl/Gd9r6c (dropbox)

                    Regras de publicação: [CADEIRA] Conteúdo da publicação.
                    "CADEIRA" a usar: Geral, Algebra, Analise, Calculo, EES, LI1, LI2, Logica, PF, PI, SC, TFM, TMD, AlgC, ArqC, CP, CD, Eletro, EE, EA, ISD, LI3, OpUM_Cadeira (Opção UMinho), POO, SO, BD, CG, CC, DSS, LI4, MNONL, MDIO, MEIO, PL, RC, SRCR, SD.
                  </div>
                  <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.exitGroup}
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