import { Button, Container, CssBaseline, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { URL, onChange, useStyles } from '../index';

import React from 'react';
import axios from 'axios';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        gender: {
          after: '',
          before: ''
        },
        name: {
          after: '',
          before: ''
        }
      },
      id: ''
    };
    this.changeDetails = this.changeDetails.bind(this);
    this.removeAccount = this.removeAccount.bind(this);
  }

  changeDetails() {
    axios.put(`${process.env.API_HOST}/users/${this.state.id}`)
      .then(() => {
        onChange(this, this.state.name, 'data.name.before');
        onChange(this, this.state.gender, 'data.gender.before');
      })
      .catch(res => {
        console.log(`Could not change details: ${res}`);
      });
  }

  removeAccount() {
    axios.delete(`${URL}/users/${this.state.id}`)
      .then(() => {
        // Remove session and other pending stuff
        this.props.history.push('/');
      })
      .catch(res => {
        console.log(`Could not remove account: ${res}`);
      });
  }

  componentDidMount() {
    const { userId } = this.props.match.params;

    onChange(this, userId, 'id');

    axios.get(`${URL}/users/${this.state.id}`)
      .then(res => {
        // Store received data
        onChange(this, res.data.name, 'data.name.before');
        onChange(this, res.data.name, 'data.name.after');
        onChange(this, res.data.gender, 'data.gender.before');
        onChange(this, res.data.gender, 'data.gender.after');
        onChange(this, res.data.email, 'data.email');
      })
      .catch(() => {
        // This.props.history.push("/404")
      });
  }

  render() {
    return (
      <Container className={'pt-xl-5'}
        component={'main'}
        maxWidth={'xs'}
      >
        <CssBaseline />
        <div className={useStyles.paper}>
          <Typography component={'h1'}
            variant={'h3'}
          >
            Profile
          </Typography>
          <div>
            <img
              alt={'...'}
              className={'img-circle img-no-padding img-responsive'}
              src={'https://img.favpng.com/10/23/1/computer-icons-user-profile-avatar-png-favpng-ypy9BWih5X28x0zDEBeemwyx8.jpg'}
              style={{
                height: 200,
                width: 200
              }}
            />
          </div>
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
              required
              value={this.state.data.email}
              variant={'outlined'}
            />
            <TextField fullWidth
              id={'name'}
              label={'Name'}
              margin={'normal'}
              name={'name'}
              onChange={({ target: { value } }) => onChange(this, value, 'data.name.after')}
              required
              type={'text'}
              value={this.state.data.name.after}
              variant={'outlined'}
            />
            <Select
              fullWidth
              id={'gender'}
              label={'Gender'}
              margin={'normal'}
              name={'gender'}
              onChange={({ target: { value } }) => onChange(this, value, 'data.gender.after')}
              required
              value={this.state.data.gender.after}
              variant={'outlined'}
            >
              <MenuItem value={'Female'}>Female</MenuItem>
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Unknown'}>Unknown</MenuItem>
            </Select>
            <Button className={useStyles.submit}
              color={'primary'}
              fullWidth
              onClick={this.changeDetails}
              variant={'contained'}
            >
              Update
            </Button>
          </form>
        </div>
      </Container>
    );
  }

}

export default Profile;
