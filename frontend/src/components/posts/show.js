import { Grid } from '@material-ui/core';
import { renderPost } from './post-render';

import Avatar from '@material-ui/core/Avatar';
import Card from 'react-bootstrap/Card';
import CreateComment from './create-comment';
import React from 'react';

const post = {
  group: '5700a8d1-fd10-4517-9c58-a6a7ae37f2b1',
  hashtags: ['post', 'teste', 'daw'],
  id: '687f0ab9-5089-45a9-99c7-e2e56fc9aa92',
  likes: [],
  owner: {
    id: '134dc87a-cb43-4943-931f-2f1eafc25309',
    image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
    name: 'Ricardo Vilaça'
  },
  text: 'És um burro Ricardo'
};

const comments = [
  {
    post: '687f0ab9-5089-45a9-99c7-e2e56fc9aa92',
    text: 'he sucks',
    user: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'João Vilaça'
    }
  },
  {
    post: '687f0ab9-5089-45a9-99c7-e2e56fc9aa92',
    text: 'that dickhead',
    user: {
      id: '134dc87a-cb43-4943-931f-2f1eafc25309',
      image: 'https://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg',
      name: 'João Vilaça'
    }
  }
];

export default class Post extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comments,
      post
    };
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
