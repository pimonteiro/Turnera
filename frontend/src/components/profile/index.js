import { Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Grid, IconButton, Link, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { getResource, deleteResource, updateResource } from '../api-handler';
import { onChange, slice, useStyles } from '../index';
import { renderPosts } from '../posts/post-render';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import React from 'react';
import SubmitFile from '../submit-file/index';
var moment = require('moment');

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      posts: [],
      userId: props.match.params.userId,
      user : {
        name: 'loading...',
        email: 'loading...',
        gender: 'Unknown',
        date: new Date()
      }
    };

    this.changeDetails = this.changeDetails.bind(this);
    this.removeAccount = this.removeAccount.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateDate = this.updateDate.bind(this);
  }

  updateName(v){
    var dummy_user = this.state.user
    dummy_user.name = v
    this.setState({user: dummy_user})
  }

  updateGender(v){
    var dummy_user = this.state.user
    dummy_user.gender = v
    this.setState({user: dummy_user})
  }

  updateDate(v){
    var dummy_user = this.state.user
    dummy_user.date = v
    console.log(dummy_user)
    this.setState({user: dummy_user})
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
    updateResource(`users/${this.state.userId}/`, {name: this.state.user.name, gender: this.state.user.gender, date: moment(this.state.user.date,"DD-MM-YYYY").format("DD/MM/YYYY").toString()})
      .then(() => {
        console.log("Done")
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
        var dummy = user.data
        var d1 = moment(dummy.date,"DD-MM-YYYY")
        dummy.date = d1.toDate()
        this.setState({ posts: slice(posts.data), user: dummy });
        console.log(this.state.user)
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
                      //src={this.state.user.pic}
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
                    <TextField
                      disabled
                      fullWidth
                      id={'email'}
                      label={'Email Address'}
                      margin={'normal'}
                      name={'email'}
                      value={this.state.user.email}
                      variant={'outlined'}
                    />
                    <br/>
                    <TextField
                      value={this.state.user.name}
                      fullWidth
                      id={'name'}
                      label={'Name'}
                      margin={'normal'}
                      name={'name'}
                      onChange={({ target: { value } }) => this.updateName(value)}
                      type={'text'}
                      variant={'outlined'}
                    />
                    <br/>
                    <Select
                      value={this.state.user.gender}
                      fullWidth
                      id={'gender'}
                      label={'Gender'}
                      name={'gender'}
                      onChange={({ target: { value } }) => this.updateGender(value)}
                      variant={'outlined'}
                    >
                      <MenuItem value={`Female`}>Female</MenuItem>
                      <MenuItem value={'Male'}>Male</MenuItem>
                      <MenuItem value={'Unknown'}>Unknown</MenuItem>
                    </Select>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Data nascimento"
                        value={this.state.user.date}
                        onChange={(date) => this.updateDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
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
