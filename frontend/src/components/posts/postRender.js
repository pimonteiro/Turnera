import { MdThumbUp } from 'react-icons/md';

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

export default function renderPost(post, index) {
  return (
    <Card
      className={'mb-5'}
      key={index}
      style={{ fontSize: '20px', width: '80rem' }}
    >
      <Card.Body>
        <div style={{ display: 'inline-flex' }}>
          <Card.Img
            alt={'user_image'}
            className={'my-3'}
            src={post.owner.image}
            style={{ marginRight: '10px', maxHeight: '150px', maxWidth: '150px' }}
          />
          <a href={`/users/${post.owner.id}`}>
            <Card.Text style={{ display: 'table-cell', height: '150px', verticalAlign: 'middle' }}>
              { post.owner.name }
            </Card.Text>
          </a>
        </div>
        <Card.Text style={{ fontSize: '20px' }}>
          { post.text }
        </Card.Text>
        <Card.Text>
          { post.likes.length } <MdThumbUp className={'mb-1'} /> - { renderHashtags(post.hashtags) }
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
