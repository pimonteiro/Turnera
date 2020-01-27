import { onChange } from '../index';

import Button from '@material-ui/core/Button';
import React from 'react';

import axios from 'axios';
import config from '../../config';

class SubmitFile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: ''
    };

    this.sendFile = this.sendFile.bind(this);
  }

    sendFile = () => {
      axios.post(config.apiURL + this.props.link)
        .then(() => {
          this.props.history.push(this.props.return);
        })
        .catch(res => {
          console.log(`Failed to upload file: ${res}`);
        });
    };

    render() {
      return (
        <div>
          {this.props.type === 'image' ? (
            <input
              accept={'image/*'}
              id={'contained-button-file'}
              onChange={({ target: { value } }) => onChange(this, value, 'file')}
              type={'file'}
            />
          ) : (
            <input
              accept={'file/*'}
              id={'contained-button-file'}
              onChange={({ target: { value } }) => onChange(this, value, 'file')}
              type={'file'}
            />
          )}
          <label htmlFor={'contained-button-file'}>
            <Button color={'primary'}
              onClick={this.sendFile}
              variant={'contained'}
            >
                        Send
            </Button>
          </label>
        </div>);
    }

}

export default SubmitFile;
