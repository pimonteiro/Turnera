import { MdSend } from 'react-icons/md';

import Avatar from '@material-ui/core/Avatar';
import Card from 'react-bootstrap/Card';
import React from 'react';

function renderHashtags(hashtags) {
  const renderedHastags = [];

  hashtags.forEach((hashtag, index) =>
    renderedHastags.push(
      <span key={index}>{`#${hashtag} `}</span>
    )
  );

  return renderedHastags;
}

export function renderPost(post, user, index) {
  console.log(post);
  console.log(user);
  
  return (
    <Card
      className={'mb-5'}
      key={index}
      style={{ fontSize: '20px', width: '80rem' }}
    >
      <Card.Body>
        <div style={{ display: 'inline-flex' }}>
          <Avatar
            alt={'user_image'}
            className={'my-3'}
            src={user.image}
            style={{ height: '100px', marginRight: '10px', width: '100px' }}
          />
          <a href={`/users/${user.id}`}>
            <Card.Text style={{ display: 'table-cell', height: '120px', verticalAlign: 'middle' }}>
              { user.name }
            </Card.Text>
          </a>
        </div>
        <Card.Text style={{ fontSize: '20px' }}>
          { post.text }
        </Card.Text>
        <Card.Text>
          { renderHashtags(post.hashtags) }
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export function renderPosts(posts, user) {
  const renderedPosts = [];

  if (posts.length === 0) {
    renderedPosts.push(<h3 key={0}>Sem publicações</h3>);
  }

  posts.forEach((post, index) =>
    renderedPosts.push(
      <div key={index}>
        <a href={`/posts/${post.id}`}><MdSend size={'1.5em'} /></a>
        { renderPost(post, user, index) }
      </div>
    )
  );

  return renderedPosts;
}
