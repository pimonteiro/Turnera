import React, { Component } from "react"

import {Container, Typography, Grid, CssBaseline, TextField, Button, Select, MenuItem, Avatar} from "@material-ui/core"
import { useStyles, onChange } from '../index';

import axios from 'axios'
import config from '../../config'
import { useParams } from "react-router-dom"

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: "",
            data: {
                name: {
                    before: "",
                    after: ""
                },
                email: "",
                gender: {
                    before: "",
                    after: ""
                }
            }
        }
        this.changeDetails = this.changeDetails.bind(this)
        this.removeAccount = this.removeAccount.bind(this)
    }

    componentDidMount(){
        const { user_id } = this.props.match.params
        onChange(this,user_id,"id")
        axios.get(config.apiURL + "/users/" + this.state.id)
        .then(res => {
            //Store received data
            onChange(this,res.data.name,"data.name.before")
            onChange(this,res.data.name,"data.name.after")
            onChange(this,res.data.gender,"data.gender.before")
            onChange(this,res.data.gender,"data.gender.after")
            onChange(this,res.data.email,"data.email")
        })
        .catch(res => {
          //this.props.history.push("/404")
        })
    }

    changeDetails(){
        axios.put(config.URL + "/users/" + this.state.id)
        .then(res => {
            onChange(this,this.state.name,"data.name.before")
            onChange(this,this.state.gender,"data.gender.before")
        })
        .catch(res => {
            console.log("Could not change details: " + res)
        })
    }

    removeAccount(){
        axios.delete(config.URL + "/users/" + this.state.id)
        .then(res => {
            //Remove session and other pending stuff
            this.props.history.push("/")
        })
        .catch(res => {
            console.log("Could not remove account: " + res)
        })
    }

    render(){
        return (
<Container component="main" maxWidth="xs" className="pt-xl-5">
        <CssBaseline />
        <div className={useStyles.paper}>
          <Typography component="h1" variant="h3">
            Profile
          </Typography>
          <div>
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src="https://img.favpng.com/10/23/1/computer-icons-user-profile-avatar-png-favpng-ypy9BWih5X28x0zDEBeemwyx8.jpg"
                style={{
                    width: 200,
                    height: 200
                }}
              />
            </div>
          <form className={useStyles.form} noValidate>
            <TextField variant="outlined"
                       margin="normal" required fullWidth value={this.state.data.email}
                       id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField onChange={({ target: { value } }) => onChange(this, value, "data.name.after")}  variant="outlined"
                       margin="normal" required fullWidth name="name"
                       label="Name" type="text" id="name" value={this.state.data.name.after}/>
            <Select
                label="Gender"
                id="gender"
                variant="outlined"
                margin="normal" required fullWidth name="gender"
                value={this.state.data.gender.after}
                onChange={({ target: { value } }) => onChange(this, value, "data.gender.after")}
                >
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Unknown"}>Unknown</MenuItem>
            </Select>
            <Button fullWidth variant="contained" color="primary" className={useStyles.submit}
                    onClick={this.changeDetails}>
              Update
            </Button>
          </form>
        </div>
      </Container>
        );
    }

}

export default Profile