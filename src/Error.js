import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles((theme) => ({
    body: {
        margin: theme.spacing(20),
        fontSize: "5em",
        textAlign: 'center',

    },

    errorIcon: {
        marginBottom: theme.spacing(3)
    }
}));

function Error() {
    const classes = useStyles()

    return(
        <div className={classes.body}>
            <Typography className={classes.errorIcon} >
                <SentimentVeryDissatisfiedIcon style={{fontSize: 175}}/>
            </Typography>
            <Typography variant="h2">404</Typography>
            <Typography variant="h5">The page you're looking for was not found.</Typography>            
        </div>
    )
}

export default Error;