import { Grid } from '@material-ui/core';
import { getResource } from '../api-handler';
import { renderPost } from './post-render';
import { slice } from '../index';

import Avatar from '@material-ui/core/Avatar';
import Card from 'react-bootstrap/Card';
import CreateComment from './create-comment';
import React from 'react';

export default class Post extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      post: []
    };
  }

  componentDidMount() {
    getResource(`users/${this.state.userId}/posts`).then(posts => {
      this.setState({ posts: slice(posts.data) });
    });
  }

  renderComments = comments => {
    const renderedComments = [];

    if (comments.length === 0) {
      renderedComments.push(<h3>Sem comentários</h3>);
    }

    comments.forEach((comment, index) =>
      renderedComments.push(
        <Card
          className={'mb-5'}
          key={index}
          style={{ fontSize: '20px', marginLeft: '5rem', width: '75rem' }}
        >
          <Card.Body>
            <div style={{ display: 'inline-flex' }}>
              <Avatar
                alt={'user_image'}
                className={'my-2'}
                src={comment.user.image}
                style={{ marginRight: '10px', maxHeight: '50px', maxWidth: '50px' }}
              />
              <a href={`/users/${comment.user.id}`}>
                <Card.Text style={{ display: 'table-cell', height: '50px', verticalAlign: 'middle' }}>
                  { comment.user.name }
                </Card.Text>
              </a>
            </div>
            <Card.Text style={{ fontSize: '20px' }}>
              { comment.text }
            </Card.Text>
          </Card.Body>
        </Card>
      )
    );

    return renderedComments;
  };

  render() {
    return (
      <Grid
        alignItems={'center'}
        container
        direction={'column'}
        justify={'center'}
      >
        { renderPost(this.state.post, 0) }
        { this.renderComments(this.state.comments) }
        <CreateComment postId={this.state.post.id} />
      </Grid>
    );
  }

}
