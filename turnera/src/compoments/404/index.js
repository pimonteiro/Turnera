import React, { Component } from "react"
import {Typography, Container, CssBaseline} from "@material-ui/core";



class NotFound extends Component{
    render() {
        return (
          <div>
            <Container fixed>
              <CssBaseline />
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
              <br/>
              <br/>
              <Typography component="h1" variant="h1" align="center">
                  404
              </Typography>
              <Typography component="h2" variant="h3" align="center">
                  The page you're looking for can't be found.
              </Typography>
            </Container>
          </div>
        );
      }
}

export default NotFound;