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
    },
    processingButton: {
        position: "relative",
        top: '50%',
        left: '50%',
        marginTop: "70px",
        transform: "translate(-50%, -50%)",
        background: "#9ea2ad",
        color: "#eee"
    }
})

export default ({handleOnCountChange, handleOnCountryChange, handleOnCsvChange, handleOnSubmit, csv, count, location, process, handleOnProcess}) => {

    const classes = useStyles();

    // const [clicked, setClicked] = useState(false);
    let button;

    // const handleOnClickProcess = (bool) => {
    //     setClicked(bool);
    // }

    if (process) {
        button = (<Button type={'submit'} size="large" className={classes.processingButton} variant="outlined" onClick={handleOnSubmit} disabled>
            Processing
        </Button>)
    } else {
        button = (<Button type={'submit'} size="large" className={classes.button} variant="outlined" onClick={e => {handleOnProcess(e, true); handleOnSubmit(e)}}>
            Process Queries
        </Button>)
    }

    return (
        <Fragment>
            <form className={classes.root} onSubmit={handleOnSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField required className= {classes.gridItem} variant="outlined" label="Queries" onChange={handleOnCsvChange} value={csv}/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField required className={classes.gridItem} variant="outlined" label="Count" placeholder="10-100" value={count} onChange={handleOnCountChange} value={count}/>
                    </Grid>
                    <Grid item xs={4}>
                        <SelectCountry handleChange={handleOnCountryChange} location={location} required className={classes.gridItem} />
                    </Grid>
                </Grid>
                <Grid container>
                    {button}
                </Grid>
            </form>
        </Fragment>
    )
}