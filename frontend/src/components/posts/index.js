import { Grid } from '@material-ui/core';
import { getResource } from '../api-handler';
import { renderPosts } from './post-render';
import { slice } from '../index';

import CreatePost from './create-post';
import React from 'react';

export default class Posts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groupId: props.groupId,
      posts: [],
      userId: props.userId,
      type: props.type
    };
  }

  getPosts = async () => {
    if(this.props.type === 'feed')
      return await getResource(`user_feed/${this.state.userId}`);
    else
      return await getResource(`groups/${this.state.groupId}/posts`)
  };

  componentDidMount() {
    this.getPosts().then(res => {
      console.log(res)
      this.setState({ posts: slice(res.data) });
    });
  }
  
  update = () => {
    this.getPosts()
    //getResource(`user_feed/${this.state.userId}`).
    .then(res => {
      this.setState({ posts: slice(res.data) });
    });
  };

  render() {
    return (
      <Grid
        alignItems={'center'}
        container
        direction={'column'}
        justify={'center'}
      >
        <CreatePost
          groupId={this.state.groupId}
          userId={this.state.userId}
          callback={this.update}
          type={this.state.type}
        />
        { renderPosts(this.state.posts) }
      </Grid>
    );
  }

}
