import React, {useState} from 'react'
import SearchResult from './SearchResult'
import { Button, makeStyles, TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';

import "./SearchGrid.css"

const useStyles = makeStyles({
    searchGridContainer: {
        width: "90%",
        margin: "0 auto",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    },
    searchGrid: {
      border: "solid 1px #5C6784",
      borderRadius: "3px",
      padding: "10px 15px",
      marginTop: "15px"
    },
    searchSearchContainer: {
        display: "grid",
        width: "100%"
    },
    searchSearchItem: {
        width: "100%",
        margin: "0",
        display: "flex"
    },
    searchField: {
        width: "100%",
        marginBottom: "-5px"
    },
    searchButton: {
        height: "fit-content",
        marginLeft: "10px"
    }
  })

export default (props) => {
    const classes = useStyles();

    return (
        <div className={classes.searchGridContainer}>
            <Grid container >
                <Grid item xs={9}>
                  <h3> Top {props.searchResults.length} Results </h3>  
                </Grid>
                <Grid item xs={3} className={classes.searchSearchItem}>
                   <TextField className={classes.searchField} value={props.search} onChange={props.handleOnSearchChange} placeholder="Search"/> 
                   <Button variant="outlined" color="primary" onClick={props.handleOnSearch} className={classes.searchButton}> Submit </Button>
                </Grid>
            </Grid>
            <div className={classes.searchGrid}>
                {props.searchResults.map(result => {
                    return <SearchResult handleOnNo={props.handleOnNo} handleOnYes={props.handleOnYes} key={result.id} name={result.id} marked={result.marked} selection={result.selection} content={result.content} title={result.title} query={result.query} relevance={result.relevance}/>
                })}
            </div>
        </div>
    )
}