import { Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  IconButton, MenuItem, Select, TextField, Typography, Paper, Grid } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { onChange, useStyles } from '../index';

import React from 'react';
import SubmitFile from '../submitfile/index';
import axios from 'axios';
import config from '../../config';
import renderPost from '../posts/postRender';

const posts = [
  {
    group: '5700a8d1-fd10-4517-9c58-a6a7ae37f2b1',
    hashtags: ['post', 'teste', 'daw'],
    id: '687f0ab9-5089-45a9-99c7-e2e56fc9aa92',
    likes: [],
    owner: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'João Vilaça'
    },
    text: 'Post nº1'
  },
  {
    group: '',
    hashtags: ['teste', 'daw'],
    id: 'c9e72ecf-8e3a-4893-b823-2158b1f3bff0',
    likes: ['ce077699-2fd8-4785-a48b-ce6807674308', 'abb20016-899a-47ba-a207-76040c2e0fbc', '9d802498-2da9-4ba3-80c8-d746aba1aa4a'],
    owner: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'João Vilaça'
    },
    text: 'Post nº2'
  },
  {
    group: '5700a8d1-fd10-4517-9c58-a6a7ae37f2b1',
    hashtags: ['post', 'teste', 'daw'],
    id: '687f0ab9-5089-45a9-99c7-e2e56fc9aa92',
    likes: [],
    owner: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'João Vilaça'
    },
    text: 'Post nº1'
  },
  {
    group: '',
    hashtags: ['teste', 'daw'],
    id: 'c9e72ecf-8e3a-4893-b823-2158b1f3bff0',
    likes: ['ce077699-2fd8-4785-a48b-ce6807674308', 'abb20016-899a-47ba-a207-76040c2e0fbc', '9d802498-2da9-4ba3-80c8-d746aba1aa4a'],
    owner: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'João Vilaça'
    },
    text: 'Post nº2'
  },
  {
    group: '5700a8d1-fd10-4517-9c58-a6a7ae37f2b1',
    hashtags: ['post', 'teste', 'daw'],
    id: '687f0ab9-5089-45a9-99c7-e2e56fc9aa92',
    likes: [],
    owner: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'João Vilaça'
    },
    text: 'Post nº1'
  },
  {
    group: '',
    hashtags: ['teste', 'daw'],
    id: 'c9e72ecf-8e3a-4893-b823-2158b1f3bff0',
    likes: ['ce077699-2fd8-4785-a48b-ce6807674308', 'abb20016-899a-47ba-a207-76040c2e0fbc', '9d802498-2da9-4ba3-80c8-d746aba1aa4a'],
    owner: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'João Vilaça'
    },
    text: 'Post nº2'
  }
];

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
      open: false,
      posts
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

  renderPosts = () => {
    const renderedPosts = [];

    if (this.state.posts.length === 0) {
      renderedPosts.push(<h3>Sem publicações</h3>);
    }

    this.state.posts.forEach((post, index) =>
      renderedPosts.push(
        renderPost(post, index)
      )
    );

    return renderedPosts;
  };


  render() {
    return (
      <Grid container>
        <Grid item xs={3}>
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
          </Grid>
          <Grid item xs={9} justify="center">
            <div style={{ marginRight: '5%' }}>
              { this.renderPosts() }
            </div>
          </Grid>

      </Grid>
    );
  }

}

export default Profile;
