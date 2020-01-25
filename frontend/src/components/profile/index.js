import { Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  IconButton, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { onChange, useStyles } from '../index';

import React from 'react';
import SubmitFile from '../submitfile/index';
import axios from 'axios';
import config from '../../config';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: 'pi@pi.pt',
        gender: {
          after: 'Female',
          before: 'Female'
        },
        name: {
          after: 'Filipe',
          before: 'Filipe'
        }
      },
      id: '',
      open: false
    };
    this.changeDetails = this.changeDetails.bind(this);
    this.removeAccount = this.removeAccount.bind(this);
  }

  removeAccount() {
    axios.delete(`${config.URL}/users/${this.state.id}`)
      .then(() => {
        // Remove session and other pending stuff
        this.props.history.push('/');
      })
      .catch(res => {
        console.log(`Could not remove account: ${res}`);
      });
  }

  changeDetails() {
    if (this.state.data.name.before !== this.state.data.name.after || this.state.data.gender.before !== this.state.data.gender.after) {
      axios.put(`${config.URL}/users/${this.state.id}`, {
        gender: this.state.data.gender.after,
        name: this.state.data.name.after
      })
        .then(() => {
          onChange(this, this.state.data.name.after, 'data.name.before');
          onChange(this, this.state.data.gender.after, 'data.gender.before');
        })
        .catch(res => {
          console.log(`Could not change details: ${res}`);
        });
    }
  }

  componentDidMount() {
    const { userId } = this.props.match.params;

    onChange(this, userId, 'id');
    axios.get(`${config.apiURL}/users/${this.state.id}`)
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
            <div>
              <label htmlFor={'icon-button-file'}>
                <IconButton aria-label={'upload picture'}
                  color={'primary'}
                  component={'span'}
                  onClick={() => onChange(this, true, 'open')}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <Dialog aria-labelledby={'form-dialog-title'}
                onClose={() => onChange(this, false, 'open')}
                open={this.state.open}
              >
                <DialogTitle id={'form-dialog-title'}>Upload</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                                Upload image
                  </DialogContentText>
                  <SubmitFile link={'/....'}
                    return={`/users/${this.id}`}
                    type={'image'}
                  />
                </DialogContent>
                <DialogActions>
                  <Button color={'primary'}
                    onClick={() => onChange(this, false, 'open')}
                  >
                                Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <form className={useStyles.form}
            noValidate
          >
            <TextField autoComplete={'email'}
              autoFocus
              disabled={'true'}
              fullWidth
              id={'email'}
              label={'Email Address'}
              margin={'normal'}
              name={'email'}
              value={this.state.data.email}
              variant={'outlined'}
            />
            <TextField fullWidth
              id={'name'}
              label={'Name'}
              margin={'normal'}
              name={'name'}
              onChange={({ target: { value } }) => onChange(this, value, 'data.name.after')}
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
