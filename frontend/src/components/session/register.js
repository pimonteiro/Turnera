import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";

import { useStyles, onChange } from './index';


export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      type: "register"
    };
  }

  render() {
    return (
      <Container component="main" maxWidth="xs" className="pt-xl-5">
        <CssBaseline />
        <div className={useStyles.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={useStyles.form} noValidate>
            <TextField onChange={({ target: { value } }) => onChange(this, value, "email")} variant="outlined"
                       margin="normal" required fullWidth
                       id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField onChange={({ target: { value } }) => onChange(this, value, "password")}  variant="outlined"
                       margin="normal" required fullWidth name="password"
                       label="Password" type="password" id="password" autoComplete="current-password" />
            <Button fullWidth variant="contained" color="primary" className={useStyles.submit}
                    onClick={this.props.callback.bind(this, this.state)}>
              Sign In
            </Button>
            <Grid container className="pt-2">
              <Grid item>
                <Link href="/register" variant="body2">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
