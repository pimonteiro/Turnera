import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1)
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%'
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(8)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const onChange = (state, value, key) => {
  const obj = {};

  obj[key] = value;
  state.setState(obj);
};

export const slice = array => {
  if (!Array.isArray(array)) {
    return [];
  }

  return array.slice(0, 5);
};
