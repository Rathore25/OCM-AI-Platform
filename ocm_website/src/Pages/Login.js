import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

import Header from '../Components/Header'
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    mgTop: {
        marginTop: "10px"
    },
    button: {
        position: "relative",
        top: '50%',
        left: '50%',
        marginTop: "70px",
        transform: "translate(-50%, -50%)",
        background: "#5C6784",
        color: "#ddd"
    }
})

export default () => {
    const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();

      const res = await axios(`http://${process.env.REACT_APP_HOST}/api/v1/auth/login`, {
        method: "POST",
        withCredentials: true,
        headers: {"Content-Type": "application/json"},
        data: {
          email,
          password
        }
      });
      
      if (res.data.status === 'Success') {
          setLoggedIn(true);
      }
  }

  if(loggedIn) {
      return <Redirect to="/" />
  } else {

    return (
        <Container xs="md">
            <Grid container>
                <Header />
            </Grid>
            <form className={classes.root} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Email" onChange={handleEmailChange}/>
                    </Grid>
                </Grid>
                <Grid container className={classes.mgTop}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Password" type="password" onChange={handlePasswordChange}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Button type={'submit'} size="large" className={classes.button} variant="outlined" onClick={handleSubmit}>
                        Login
                    </Button>
                </Grid>
            </form>
        </Container>
    )
  }
}