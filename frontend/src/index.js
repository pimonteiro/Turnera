import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';

dotenv.config();

ReactDOM.render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
