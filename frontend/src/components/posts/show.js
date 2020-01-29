import { Grid } from '@material-ui/core';
import { getResource } from '../api-handler';
import { renderPost } from './post-render';

import Avatar from '@material-ui/core/Avatar';
import Card from 'react-bootstrap/Card';
import CreateComment from './create-comment';
import React from 'react';

export default class Post extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      post: [],
      postId: props.match.params.postId,
      userId: props.userId
    };
  }
  
  newComment = (comment) => {
    getResource(`posts/${this.state.postId}`).then(post => {
      this.setState({ post: post.data });
    });
  };

  componentDidMount() {
    getResource(`posts/${this.state.postId}`).then(post => {
      this.setState({ post: post.data });
    });
  }

  renderComments = com => {
    const renderedComments = [];

    if (com.length === 0) {
      renderedComments.push(<h3 key={0}>Sem comentários</h3>);
    }

    com.reverse().forEach((comment, index) =>{
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
                src={comment.owner.image}
                style={{ marginRight: '10px', maxHeight: '50px', maxWidth: '50px' }}
              />
              <a href={`/users/${comment.owner.id}`}>
                <Card.Text style={{ display: 'table-cell', height: '50px', verticalAlign: 'middle' }}>
                  { comment.owner.name }
                </Card.Text>
              </a>
            </div>
            <Card.Text style={{ fontSize: '20px' }}>
              { comment.text }
            </Card.Text>
          </Card.Body>
        </Card>
      )}
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
        {this.state.post.length === 0 ?
          <h3>A carregar publicação...</h3>
        :
          <div>
            { renderPost(this.state.post, 0) }
            { this.renderComments(this.state.post.comments) }
            <CreateComment postId={this.state.post.id} userId={this.state.userId} callback={this.newComment}/>
         </div>
        }
      </Grid>
    );
  }

}
