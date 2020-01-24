import React, { Component } from "react"

import {Container, Typography, Grid} from "@material-ui/core"

class Homepage extends Component{
    render() {
        return (
          <Container component="div"  alignContent="center" style={{
            backgroundImage: `url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)`
            ,backgroundRepeat: "no-repeat"
            ,backgroundPosition: "center"
          }}>
            <Grid container spacing={0} align="center" justify="center">
              <Grid item>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Grid container spacing={0} align="center" direction="row" justify="center">
                  <Grid item xs={12}>
                    <Grid container spacing={5} direction="row" wrap="nowrap" alignItems="center">
                      <Grid item xs={3}></Grid>
                      <Grid item>
                        <img src="tea.png" style={{
                        width:150,
                        height:150
                            }} 
                        />
                      </Grid>
                      <Grid item>  
                        <Typography component="h1" variant="h1" align="center">
                        Turnera
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Grid>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5" align="center">
                    Your Social network of choice *wink wink*
                  </Typography>
                </Grid>
              </Grid>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              </Grid>
            </Grid>
          </Container>
        );
      }
}






export default Homepage;