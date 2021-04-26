import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { TextField} from '@material-ui/core';

var data = require('./probability.json');
 
const useStyles = makeStyles((theme) => ({
    probability: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(10),
    },

    input: {
        marginTop: theme.spacing(0.5),
        width: '100%',
        fontFamily: 'Courier New',
        fontSize: '1em',
    
        "& .MuiInputBase-root.Mui-disabled": {
        color: "black"
        }
    },
}));


function Probability(cipher) {
    const classes = useStyles();

    const inputProps={
        classes: {
            input: classes.input,
        },
    };
    
    function getProbability(cipherProbability){
        var rows = ""

        for(var i = 0; i < 5; i++){
            for(var j = 0; j < cipherProbability.length; j++){
                rows += data[cipherProbability.charAt(j)][i][0][0]
            }
            
            rows += "\n"

            for(var k = 0; k < cipherProbability.length; k++){
                rows += data[cipherProbability.charAt(k)][i][0][1]
            }
            
            rows += "\n\n"
        }

        return rows
    }

    return(
        <div className={classes.probability}>
            <TextField 
                InputLabelProps={{shrink: true,}} 
                InputProps={inputProps}
                label="Probability" 
                disabled 
                value={cipher.cipher ? getProbability(cipher.cipher).trim() : ""} 
                variant="outlined" 
                multiline rows={14}  
                className={classes.input}/>
        </div>
    )
}

export default Probability;