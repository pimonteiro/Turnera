import Posts from './posts';
import React from 'react';

export default class Home extends React.Component {
  
  render() {
    return (
      <Posts type='feed' userId={this.props.userId}/>
    );
  }
}
