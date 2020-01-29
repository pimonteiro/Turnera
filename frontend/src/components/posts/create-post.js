import { TextField } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';
import _ from 'underscore';
import {onChange} from '../index';
import { createResource, uploadFile} from '../api-handler';

export default class CreatePost extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groupId: props.groupId,
      newPostContent: '',
      newPostFiles: [],
      type: props.type, 
      userId: props.userId,
      links: []
    };

    this.uploadData = this.uploadData.bind(this)
  }

  submit = () => {
    const text = this.state.newPostContent;
    const hashtags = _.uniq(text.match(/(#[a-z\d-]+)/ig)) || [];
    console.log(this.state.links)
    if(this.state.type === 'feed'){
      createResource(`users/${this.state.userId}/posts`, {
        text: text,
        hashtags: hashtags,
        owner: this.state.userId,
        group: "",
        images: this.state.links,
        likes: []
      })  
        .then(res => {
          console.log("POST FEITO")
          //this.props.history.push(`/users/${this.state.userId}`)
        })
    }
    else{
      createResource(`groups/${this.state.groupId}/posts`,{
        text: text,
        hashtags: hashtags,
        owner: this.state.userId,
        group: this.state.groupId,
        images: this.state.links,
        likes: []
      })
        .then(res => {
          console.log("POST FEITO")
          //this.props.history.push(`/users/${this.state.userId}/groups/${this.state.groupId}`)
        })
    }
  };

  uploadData() {
    Array.from(this.state.newPostFiles).forEach(f => {
      uploadFile(`upload`,f)
        .then(res => {
          this.state.links.push(res.data)
          if(this.state.newPostFiles.length === this.state.links.length) {
            this.submit();
            return;
          }
        })
        .catch(res => {
          console.log(res)
        })
      })
      this.submit();
  }

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
            multiple
            onChange={e => onChange(this, e.target.files, 'newPostFiles')}
            type={'file'}
          />
        </div>
        <Button
          color={'primary'}
          onClick={this.uploadData}
          variant={'contained'}
        >Publicar</Button>
      </Box>
    );
  }

}
