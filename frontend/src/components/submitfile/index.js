import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import config from '../../config'
import {onChange} from '../index'

class SubmitFile extends Component{
    constructor(props){
        super(props)
        this.state = {
            file: ""
        }
        
        this.sendFile = this.sendFile.bind(this)
    }

    sendFile = () => {
        axios.post(config.apiR + this.props.link)
        .then(res => {
            this.props.history.push(this.props.return)
        })
        .catch(res => {
            console.log("Failed to upload file: " + res)
        })
    }

    render(){
        return (
            <div>
                {this.props.type == "image" ? (
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={({ target: { value } }) => onChange(this, value, "file")}
                    />
                ) : (
                    <input
                        accept="file/*"
                        id="contained-button-file"
                        type="file"
                        onChange={({ target: { value } }) => onChange(this, value, "file")}
                    /> 
                )}
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" onClick={this.sendFile}>
                        Send
                    </Button>
                </label>
            </div>)
    }
}

export default SubmitFile