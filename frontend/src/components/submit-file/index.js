import { onChange } from '../index';

import Button from '@material-ui/core/Button';
import React from 'react';

import {createResource, updateResource} from '../api-handler'
import {upload_file, upload_image} from './azure'
class SubmitFile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: ''
    };

    this.sendFile = this.sendFile.bind(this);
  }

    sendFile = () => {
      upload_image(this.state.file)
        .then(url => {
          this.props.object.image= url
          updateResource(this.props.link, this.props.object)
          .then(() => {
            this.props.history.push(this.props.return);
          })
          .catch(res => {
            console.log(`Failed to upload file: ${res}`);
          });
        })
        .catch(res => console.log("Error azure: " + res))
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
