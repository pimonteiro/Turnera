import { onChange, useStyles } from '../index';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default class Signin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      type: 'login'
    };
  }

  render() {
    const action = 'Sign in';
    const signUpMessage = 'Don\'t have an account? Sign Up';

    return (
      <Container className={'pt-xl-5'}
        component={'main'}
        maxWidth={'xs'}
      >
        <CssBaseline />
        <div className={useStyles.paper}>
          <Typography component={'h1'}
            variant={'h5'}
          >
            { action }
          </Typography>
          <form className={useStyles.form}
            noValidate
          >
            <TextField autoComplete={'email'}
              autoFocus
              fullWidth
              id={'email'}
              label={'Email Address'}
              margin={'normal'}
              name={'email'}
              onChange={({ target: { value } }) => onChange(this, value, 'email')}
              required
              variant={'outlined'}
            />
            <TextField autoComplete={'current-password'}
              fullWidth
              id={'password'}
              label={'Password'}
              margin={'normal'}
              name={'password'}
              onChange={({ target: { value } }) => onChange(this, value, 'password')}
              required
              type={'password'}
              variant={'outlined'}
            />
            <Button className={useStyles.submit}
              color={'primary'}
              fullWidth
              onClick={this.props.callback.bind(this, this.state)}
              variant={'contained'}
            >
              { action }
            </Button>
            <Grid className={'pt-2'}
              container
            >
              <Grid item>
                <Link href={'/register'}
                  variant={'body2'}
                >
                  { signUpMessage }
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

}
