import { TextField } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';
import {createResource} from "../api-handler";

export default class CreateComment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newCommentContent: '',
      postId: props.postId,
      userId: props.userId
    };
  
    this.callback = this.props.callback.bind(this);
  }

  submit = () => {
    createResource(`posts/${this.state.postId}/comment`, { user: this.state.userId, text: this.state.newCommentContent })
      .then(res => this.callback(res.data));
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
          onChange={e => this.setState({ newCommentContent: e.target.value })}
          placeholder={'Escreve um comentário...'}
        />
        <Button
          color={'primary'}
          onClick={this.submit}
          variant={'contained'}
        >Comentar</Button>
      </Box>
    );
  }

}
