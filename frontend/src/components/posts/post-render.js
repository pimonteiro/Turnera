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

function renderFiles(files){
  const renderedFiles = [];

  files.forEach((file, index) => {
    renderedFiles.push(
      <div>
      <a href={file}>{file}</a><br/>
      </div>
    )
  })

  return renderedFiles;
}

export function renderPost(post, index) {
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
            src={post.owner.image}
            style={{ height: '100px', marginRight: '10px', width: '100px' }}
          />
          <a href={`/users/${post.owner.id}`}>
            <Card.Text style={{ display: 'table-cell', height: '120px', verticalAlign: 'middle' }}>
              { post.owner.name }
            </Card.Text>
          </a>
        </div>
        <Card.Text style={{ fontSize: '20px' }}>
          { post.text }
        </Card.Text>
        <Card.Text>
          { renderHashtags(post.hashtags) }
        </Card.Text>
        <Card.Text>
          { renderFiles(post.images) }
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export function renderPosts(posts) {
  const renderedPosts = [];

  if (posts.length === 0) {
    renderedPosts.push(<h3 key={0}>Sem publicações</h3>);
  }

  posts.forEach((post, index) =>
    renderedPosts.push(
      <div key={index}>
        <a href={`/posts/${post.id}`}><MdSend size={'1.5em'} /></a>
        { renderPost(post, index) }
      </div>
    )
  );

  return renderedPosts;
}
