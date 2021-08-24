import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    pageNumbersContainer: {
        margin: "0 auto",
        width: "20%",
        listStyleType: "none"
    },
    pageNumbersItem: {
        width: "fit-content",

    }
})

export default () => {
    const classes = useStyles();
    return (
        <ul className={classes.pageNumbersContainer}>
            <li> 1 </li>
            <li> 2 </li>
        </ul>
    )
}