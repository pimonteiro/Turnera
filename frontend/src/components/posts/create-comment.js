import { TextField } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';

export default class CreateComment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newCommentContent: '',
      postId: props.postId
    };
  }

  submit = () => {
    const text = this.state.newCommentContent;

    console.log(text);
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
