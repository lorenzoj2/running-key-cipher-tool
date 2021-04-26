import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Slider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  body: {
    margin: 0,
    marginBottom: theme.spacing(8),
  },

  keywordSlider: {
    textAlign: 'center',
    margin: '20px 20px 0px 20px',
  },

  slider: {
    width: '30%',
  },

  input: {
    marginTop: theme.spacing(0.5),
    width: '100%',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
  },

  textField: {
    margin: '20px 20px 0px 20px',
  }

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

  function keywordChange(e, newValue) {
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

  return (
    <div className={classes.body}>
      <div className={classes.keywordSlider}>
        <Slider className={classes.slider} step={1} max={cipherInput.length - keywordInput.trim().length} value={slider} onChange={sliderChange}/>
        <TextField inputProps={{spellCheck: "false"}} InputProps={inputProps} placeholder="Keyword" value={keywordInput} variant="outlined" rows={2} className={classes.input} onChange={keywordChange}/>
      </div>

      <div className={classes.textField}>
        <TextField inputProps={{maxLength: 140, spellCheck: "false"}} InputProps={inputProps} placeholder="Ciphertext" value={cipherInput} variant="outlined" rows={2} className={classes.input} onChange={(e) => setCipherInput(e.target.value.toUpperCase().replace(/\s/g, ''))}/>
      </div>

      <div className={classes.textField}>
        <TextField inputProps={{spellCheck: "false"}} InputProps={inputProps} placeholder="Plaintext" value={plaintext} variant="outlined" rows={2} className={classes.input}/>
      </div>

    </div>
  );
}

export default Solver;
