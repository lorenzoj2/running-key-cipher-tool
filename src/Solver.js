import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {TextField, Slider} from '@material-ui/core';

import Probability from './Probability'

const useStyles = makeStyles((theme) => ({
  body: {
    width: "100%",
    height: "600px",
    margin: 0,
  },

  keywordSlider: {
    textAlign: 'center',
    margin: theme.spacing(3),
  },

  slider: {
    width: '30%',
  },

  input: {
    marginTop: theme.spacing(0.5),
    width: '100%',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: '1em',
    
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black"
    }
  },

  textField: {
    margin: theme.spacing(3),
  },
}));

function Solver() {
  const classes = useStyles();

  const inputProps={
    classes: {
      input: classes.input,
    },
  };

  const [keywordInput, setKeywordInput] = useState("")
  const [cipherInput, setCipherInput] = useState("")
  const [plaintext, setPlaintext] = useState("")

  const [slider, setSlider] = useState(0)

  function sliderChange(e, newValue){
    var adjustKeyword = "";
    var adjustPlain = "";

    // Add spaces to the beginning of the word based on slider value
    for(var i = 0; i <= newValue - 1; i++){
      adjustKeyword = adjustKeyword + " "
    }

    adjustKeyword += keywordInput.trim()

    // Decipher and update plaintext result
    for(i = 0; i < adjustKeyword.length; i++){
      if(adjustKeyword.charAt(i) !== " "){
        let newChar = (((cipherInput.toLowerCase().charCodeAt(i)-96) - (adjustKeyword.toLowerCase().charCodeAt(i)-96)))
        newChar >= 0 ? newChar = newChar % 26 : newChar === 0 ? newChar = newChar + 1 : newChar = newChar + 26
        adjustPlain = adjustPlain + String.fromCharCode(97 + newChar)
      }
      else{
        adjustPlain = adjustPlain + " "
      }
    }

    setPlaintext(adjustPlain)
    setKeywordInput(adjustKeyword)
    setSlider(newValue)
  }

  function keywordChange(e) {
    var adjustPlain = ""
    var keyword = e.target.value

   // Decipher and update plaintext result
    for(var i = 0; i < keyword.length; i++){
      console.log(keyword.charAt(i))
      if(keyword.charAt(i) !== " "){
        let newChar = (((cipherInput.toLowerCase().charCodeAt(i)-96) - (keyword.toLowerCase().charCodeAt(i)-96)))
        newChar >= 0 ? newChar = newChar % 26 : newChar === 0 ? newChar = newChar + 1 : newChar = newChar + 26
        adjustPlain = adjustPlain + String.fromCharCode(97 + newChar)
      }
      else{
        adjustPlain = adjustPlain + " "
      }
    }

    setKeywordInput(e.target.value)
    setPlaintext(adjustPlain)
  }

  function cipherChange(e) {
    setCipherInput(e.target.value.toUpperCase())
  }

  return (
    <div className={classes.body}>
      <div className={classes.keywordSlider}>
        <Slider className={classes.slider} step={1} max={cipherInput.length - keywordInput.trim().length} value={slider} onChange={sliderChange}/>
        <TextField label="Keyword" inputProps={{spellCheck: "false"}} InputProps={inputProps} value={keywordInput} variant="outlined" className={classes.input} onChange={keywordChange}/>
      </div>

      <div className={classes.textField}>
        <TextField label="Ciphertext" inputProps={{maxLength: 138, spellCheck: "false"}} InputProps={inputProps} value={cipherInput} variant="outlined" className={classes.input} onChange={cipherChange}/>
      </div>

      <div className={classes.textField}>
        <TextField disabled label="Plaintext" inputProps={{spellCheck: "false"}} InputLabelProps={{shrink: true,}} InputProps={inputProps} value={plaintext} variant="outlined" className={classes.input}/>
      </div>

      <Probability cipher={cipherInput}/>
    </div>
  );
}

export default Solver;
