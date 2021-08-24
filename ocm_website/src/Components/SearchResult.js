import React from 'react'
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    searchItem: {
        padding: "10px 15px",
        margin: "0 auto",
        "&:not(:last-child)": {
            borderBottom: "solid 0.5px #5C6784",
            marginBottom: "10px"
        },
    },
    searchLink: {
        fontSize: "20px",
        color: "#5C6784",
        marginBottom: "10px"
    }
})

export default ({name, content, query, title}) => {
    const classes = useStyles();
    return (
        <div className={classes.searchItem}>
            <Link target="_blank" className={classes.searchLink} href={name}>
                {name}
            </Link>
            <h4>{title}</h4>
            <p style={{marginTop: "2px"}}> {content} </p>
        </div>
    )
}