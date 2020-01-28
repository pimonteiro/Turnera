import { TextField } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';
import _ from 'underscore';
import {onChange} from '../index';
import { createResource } from '../api-handler';

export default class CreatePost extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groupId: props.groupId,
      newPostContent: '',
      newPostFile: '',
      type: props.type, 
      userId: props.userId
    };
  }

  submit = () => {
    const text = this.state.newPostContent;
    const hashtags = _.uniq(text.match(/(#[a-z\d-]+)/ig)) || [];
    createResource(`link`, {file: this.state.newPostFile})
      .then(res => {
        if(this.state.type === 'feed'){
          createResource(`users/${this.state.userId}/posts`, {
            text: text,
            hashtags: hashtags,
            owner:this.state.userId,
            group: "",
            images: [res.url]
          })  
            .then(res => {
              this.props.history.push(`/users/${this.state.userId}`)
            })
        }
        else{
          createResource(`groups/${this.state.groupId}/posts`,{
            text: text,
            hashtags: hashtags,
            owner:this.state.userId,
            group: this.state.groupId,
            images: [res.url]
          })
            .then(res => {
              this.props.history.push(`/users/${this.state.userId}/groups/${this.state.groupId}`)
            })
        }
      })
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
        <div>
          <input
            accept={'file/*'}
            id={'contained-button-file'}
            onChange={({ target: { value } }) => onChange(this, value, 'newPostFile')}
            type={'file'}
          />
        </div>
        <Button
          color={'primary'}
          onClick={this.submit}
          variant={'contained'}
        >Publicar</Button>
      </Box>
    );
  }

}
