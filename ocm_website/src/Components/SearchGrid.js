import React, {useState, useEffect} from 'react'
import SearchResult from './SearchResult'
import { Button, makeStyles, TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

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
    const [filteredResults, setFilteredResults] = useState([]);

    // const handleOnPageChange = (e, val) => {
    //     const start = (val - 1) * 10;
    //     const end = start + 10;
    //     if (end < props.searchResults.length) {
    //         setFilteredResults(props.searchResults.slice(start, end));
    //     } else {
    //         setFilteredResults(props.searchResults.slice(start, props.searchResults.length));
    //     }
    // }

    return (
        <div className={classes.searchGridContainer}>
            <Grid container >
                <Grid item xs={9}>
                  <h3> Top {props.count} Results - "{props.searchField}" </h3>  
                </Grid>
                <Grid item xs={3} className={classes.searchSearchItem}>
                   <TextField className={classes.searchField} value={props.search} onChange={props.handleOnSearchChange} placeholder="Search"/> 
                   <Button variant="outlined" color="primary" onClick={props.handleOnSearch} className={classes.searchButton}> Submit </Button>
                </Grid>
            </Grid>
            <div className={classes.searchGrid}>
            <Pagination className={classes.pagination} count={Math.ceil(props.count / 10)} variant="outlined" color="primary" onChange={props.handleOnPageChange} />
            {props.searchResults.map(result => {
                return <SearchResult handleOnNo={props.handleOnNo} handleOnYes={props.handleOnYes} key={result.id} name={result.id} marked={result.marked} selection={result.selection} content={result.content} title={result.title} query={result.query} relevance={result.relevance}/>
            })}
            </div>
        </div>
    )
}
