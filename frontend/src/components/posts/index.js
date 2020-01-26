import { Grid } from '@material-ui/core';
import { renderPosts } from './post-render';

import CreatePost from './create-post';
import React from 'react';

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
  }
];

export default class Posts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groupId: props.groupId,
      posts,
      userId: props.userId
    };
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
