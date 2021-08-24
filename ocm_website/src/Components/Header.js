import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
    height: "120px",
    background: "#e3b769"
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logo: {
    maxWidth: "300px",
    marginRight: '10px'
  }
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root}>
        <img className={classes.logo} src="https://ocmadvisory.com/wp-content/uploads/2020/11/ocm_logo.png" alt="ocm-logo"></img>
      </AppBar>
    </div>
  );
}
