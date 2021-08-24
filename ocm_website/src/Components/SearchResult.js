import React from 'react'
import Link from '@material-ui/core/Link';
import {Button, makeStyles} from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: "flex-end",
        marginBottom: "5px"
        
    },
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
    },
    buttonGroup: {
        position: "relative",
        top: "0px",
        right: "0px"
    },
    chip: {
        marginRight: "10px",
        marginTop: "3px",
        backgroundColor: "#e3b769"
    }
})

export default ({name, content, query, title, relevance, marked, selection, handleOnNo, handleOnYes}) => {
    const classes = useStyles();
    let chip;
    let yesText = "Yes";
    let noText = "No";

    if (marked) {
        chip = <Chip className={classes.chip} variant="outlined" size="small" label="Viewed"/>
    }

    if (selection === "Marked No") {
        noText = "Marked No"
    } else if (selection === "Marked Yes") {
        yesText = "Marked Yes"
    }

    return (
        <div className={classes.searchItem}>
            <div className={classes.root}>
                {chip}
                <ButtonGroup className={classes.buttonGroup} size="small" color="primary" aria-label="default primary button group">
                    <Button color="primary" onClick={(e) => {e.target.innerHtml = "Marked Yes"; handleOnYes(e,name)}}>{yesText}</Button>
                    <Button color="secondary" onClick={(e) => {handleOnNo(e,name)}}>{noText}</Button>
                </ButtonGroup>
            </div>
            <Link target="_blank" className={classes.searchLink} href={name}>
                {name}
            </Link>
            <h4>{title}</h4>
            <p style={{marginTop: "2px"}}> {content} </p>
        </div>
    )
}