import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

import SelectCountry from './SelectCountry';

const useStyles = makeStyles({
    root: {
        height: '50%',
        width: "60%",
        marginTop: "50px",
        alignItems: "center",
        margin: "0 auto"
    },
    gridItem: {
        width: '100%',
    },
    mgTopLg: {
        marginTop: "70px"
    },
    mgTopSm: {
        marginTop: "15px"
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

export default ({handleOnCountChange, handleOnCountryChange, handleOnCsvChange, handleOnSubmit}) => {

    const classes = useStyles();

    return (
        <Fragment>
            <form className={classes.root} onSubmit={handleOnSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField required className= {classes.gridItem} variant="outlined" label="Search" onChange={handleOnCsvChange} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField required className={classes.gridItem} variant="outlined" label="Count" placeholder="10-100" onChange={handleOnCountChange} />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectCountry handleChange={handleOnCountryChange} required className={classes.gridItem} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Button type={'submit'} size="large" className={classes.button} variant="outlined" onClick={handleOnSubmit}>
                        Search
                    </Button>
                </Grid>
            </form>
        </Fragment>
    )
}