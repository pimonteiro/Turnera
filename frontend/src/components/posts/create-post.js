import { TextField } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';
import _ from 'underscore';

export default class CreatePost extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groupId: props.groupId,
      newPostContent: '',
      userId: props.userId
    };
  }

  submit = () => {
    const text = this.state.newPostContent;
    const hashtags = _.uniq(text.match(/(#[a-z\d-]+)/ig)) || [];

    console.log(text);
    console.log(hashtags);
  };

  render() {
    return (
      <Box component={'div'}
        m={1}
        style={{ display: 'grid', marginBottom: '50px', width: '30%' }}
      >
        <TextField
          fullWidth
          margin={'normal'}
          multiline
          onChange={e => this.setState({ newPostContent: e.target.value })}
          placeholder={'Em que estás a pensar?'}
        />
        <Button
          color={'primary'}
          onClick={this.submit}
          variant={'contained'}
        >Publicar</Button>
      </Box>
    );
  }

}
