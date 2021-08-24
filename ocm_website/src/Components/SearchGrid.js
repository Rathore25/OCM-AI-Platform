import React, {useState} from 'react'
import SearchResult from './SearchResult'
import { makeStyles, TextField } from '@material-ui/core'
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
        margin: "0"
    },
    searchField: {
        width: "100%",
        marginBottom: "-5px"
    }
  })

export default (props) => {
    const classes = useStyles();

    const [searchField, setSearchField] = useState("");

    const filteredResults = props.searchResults.filter(el => 
        el.title.toLowerCase().includes(searchField.toLowerCase())
    );

    const handleOnSearchChange = (e) => {
        setSearchField(e.target.value);
      }

    return (
        <div className={classes.searchGridContainer}>
            <Grid container >
                <Grid item xs={9}>
                  <h3> Top {filteredResults.length} Results </h3>  
                </Grid>
                <Grid item xs={3} className={classes.searchSearchItem}>
                   <TextField className={classes.searchField} placeholder="Search" onChange={handleOnSearchChange} /> 
                </Grid>
            </Grid>
            <div className={classes.searchGrid}>
                {filteredResults.map(result => {
                    return <SearchResult key={result.id} name={result.id} content={result.content} title={result.title} query={result.query}/>
                })}
            </div>
        </div>
    )
}