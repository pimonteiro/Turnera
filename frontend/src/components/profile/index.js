import { Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Grid, IconButton, Link, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { getResource, deleteResource, updateResource } from '../api-handler';
import { onChange, slice, useStyles } from '../index';
import { renderPosts } from '../posts/post-render';

import React from 'react';
import SubmitFile from '../submit-file/index';
import axios from 'axios';
import config from '../../config';

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: '',
        gender: '',
        name: ''
      },
      open: false,
      posts: [],
      userId: props.match.params.userId,
      user : ""
    };

    this.changeDetails = this.changeDetails.bind(this);
    this.removeAccount = this.removeAccount.bind(this);
  }

  removeAccount() {
    deleteResource(`users/${this.state.userId}`)
      .then(res =>  {
        // Remove session and other pending stuff
        this.props.history.push('/');
      })
      .catch(res => {
        console.log(`Could not remove account: ${res}`);
      });
  }

  changeDetails() {
    updateResource(`users/${this.state.userId}/`, {name: this.state.data.name, gender: this.state.data.gender})
      .then(() => {
        onChange(this, this.state.data.name, 'data.name');
        onChange(this, this.state.data.gender, 'data.gender');
      })
      .catch(res => {
        console.log(`Could not change details: ${res}`);
      })
  }

  getPosts = async () => {
    return await getResource(`users/${this.state.userId}/posts`);
  };

  getUser = async () => {
    return await getResource(`users/${this.state.userId}`);
  };

  componentDidMount() {
    this.getPosts().then(posts => {
      this.getUser().then(user => {
        this.setState({ posts: slice(posts.data), user: user.data });
      });
    });
  }

  render() {
    return (
      <Grid container>
        <Grid item
          xs={3}
        >
          <Grid container
            spacing={2}
          >
            <Grid item
              xs={12}
            >
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
                      src={this.state.user.pic}
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
                            return={`/users/${this.state.userId }`}
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
                      disabled
                      fullWidth
                      id={'email'}
                      label={'Email Address'}
                      margin={'normal'}
                      name={'email'}
                      value={this.state.data.email}
                      variant={'outlined'}
                    />
                    <TextField
                      defaultValue={this.state.data.name}
                      fullWidth
                      id={'name'}
                      label={'Name'}
                      margin={'normal'}
                      name={'name'}
                      onChange={({ target: { value } }) => onChange(this, value, 'data.name')}
                      type={'text'}
                      variant={'outlined'}
                    />
                    <Select
                      defaultValue={this.state.data.gender}
                      fullWidth
                      id={'gender'}
                      label={'Gender'}
                      name={'gender'}
                      onChange={({ target: { value } }) => onChange(this, value, 'data.gender')}
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
                      style={{ marginTop: '20px' }}
                      variant={'contained'}
                    >
                        Update
                    </Button>
                  </form>
                </div>
                <br />
                <Link href={`/users/${this.state.userId}/friends`}>
                  <Button color={'secondary'}
                    justify={'center'}
                    variant={'contained'}
                    width={50}
                  >Amigos</Button>
                </Link>
              </Container>
            </Grid>
          </Grid>
        </Grid>
        <Grid item
          xs={9}
        >
          <div style={{ marginRight: '5%' }}>
            { renderPosts(this.state.posts, this.state.user) }
          </div>
        </Grid>

      </Grid>
    );
  }

}

export default Profile;
