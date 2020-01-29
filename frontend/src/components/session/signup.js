import { onChange, useStyles } from '../index';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {createResource} from "../api-handler";
import Alert from "react-bootstrap/Alert";

var moment = require('moment');


export default class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      gender: 'Unknown',
      date: new Date(),
      type: 'signup',
      error: false
    };
  
    this.callback = this.props.callback.bind(this);
  }
  
  signup = () => {
    createResource(this.state.type, {email: this.state.email, password: this.state.password, name: this.state.name, gender: this.state.gender, date: this.state.date })
      .then(raw => {
        if (raw.status !== 200) {
          this.setState({ error: true });
        } else {
          this.callback(raw.data.id, raw.data.name, raw.data.token);
        }
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  render() {
    const action = 'Sign up';

    return (
      <Container className={'pt-xl-5'}
        component={'main'}
        maxWidth={'xs'}
      >
        {this.state.error ?
          <Alert variant={"danger"}>
            Utilizador inválido
          </Alert>
          :
          <div />
        }
        <CssBaseline />
        <div className={useStyles.paper}>
          <Typography component={'h1'}
            variant={'h5'}
          >
            { action }
          </Typography>
          <form className={useStyles.form}
            noValidate
          >
            <TextField autoComplete={'email'}
              autoFocus
              fullWidth
              id={'email'}
              label={'Email Address'}
              margin={'normal'}
              name={'email'}
              onChange={({ target: { value } }) => onChange(this, value, 'email')}
              required
              variant={'outlined'}
            />
            <TextField autoComplete={'current-password'}
              fullWidth
              id={'password'}
              label={'Password'}
              margin={'normal'}
              name={'password'}
              onChange={({ target: { value } }) => onChange(this, value, 'password')}
              required
              type={'password'}
              variant={'outlined'}
            />
            <TextField
              fullWidth
              id={'name'}
              label={'Nome'}
              margin={'normal'}
              name={'name'}
              onChange={({ target: { value } }) => onChange(this, value, 'name')}
              type={'text'}
              variant={'outlined'}
            />
            <Select
              fullWidth
              id={'gender'}
              label={'Gênero'}
              name={'gender'}
              displayEmpty
              onChange={({ target: { value } }) => onChange(this, value, 'gender')}
              variant={'outlined'}
              value={this.state.gender}
            >
              <MenuItem value={`Female`}>Female</MenuItem>
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Unknown'}>Unknown</MenuItem>
            </Select>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Data nascimento"
                onChange={(value) => onChange(this,moment(value,"DD-MM-YYYY").format("DD/MM/YYYY").toString()
                , 'date')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <Button className={useStyles.submit}
              color={'primary'}
              fullWidth
              onClick={this.signup}
              variant={'contained'}
            >
              { action }
            </Button>
          </form>
        </div>
      </Container>
    );
  }

}
