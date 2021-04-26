import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    a: {
      textDecoration: 'none',
      color: 'white',

      "&:hover": {
        textDecoration: "underline",
      },
    },

    footer: {
      top: 'auto',
      bottom: 0,
    },

    source: {
      marginLeft: theme.spacing(2.5),      
    },
}));

function Footer() {
    const classes = useStyles();

    return (
        <AppBar className={classes.footer} color="primary" position="fixed">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" color="inherit">
              Created by John Lorenzo for CSC 483 
            </Typography>
            <Typography variant="subtitle1" color="inherit" className={classes.source}>
              ┃
            </Typography>
            <Typography variant="subtitle1" color="inherit" className={classes.source}>
              <a className={classes.a} color="inherit" href="https://github.com/lorenzoj2/vigenere-variants-tool">Source</a>
            </Typography>
          </Toolbar>
        </AppBar>
    )
}

export default Footer;