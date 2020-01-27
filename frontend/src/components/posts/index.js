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
      userId: props.userId
    };
  }

  getPosts = async () => {
    // TODO:
    return await getResource(`users/${this.state.userId}/posts`);
  };

  componentDidMount() {
    this.getPosts().then(res => {
      this.setState({ posts: slice(res.data) });
    });
  }

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
        />
        { renderPosts(this.state.posts) }
      </Grid>
    );
  }

}
