import React from 'react';
import App from './App';
import Solver from './Solver';
import Error from './Error'

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography} from '@material-ui/core';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBarOption: {
    marginLeft: theme.spacing(6),
    marginTop: theme.spacing(1),
  },

  a: {
      textDecoration: 'none',
      color: 'white',

      "&:hover": {
        textDecoration: "underline",
      },
  },
}));

function Navbar() {
    const classes = useStyles();

    return (
    <Router>
        <AppBar position="sticky">
          <Toolbar>
            <Typography className={classes.appBarMain} variant="h5" color="inherit">
              Vigenère Variants Tool
            </Typography>
            <Typography className={classes.appBarOption} variant="h6" color="inherit">
              <Link className={classes.a} to="/vigenere-variants-tool">Encipher / Decipher</Link>
            </Typography>
            <Typography className={classes.appBarOption} variant="h6" color="inherit">
              <Link className={classes.a} to="/vigenere-variants-tool/solver">Solver</Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/vigenere-variants-tool/" component={App}/>
          <Route exact path="/vigenere-variants-tool/solver" component={Solver}/>
          <Route path="/*" component={Error}/>
        </Switch>
      </Router>
    )
}

export default Navbar;