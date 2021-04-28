import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {TextField, Slider} from '@material-ui/core';

import Probability from './Probability';

const useStyles = makeStyles((theme) => ({
  body: {
    width: '100%',
    height: '600px',
    margin: 0,
  },

  keywordSlider: {
    textAlign: 'center',
    marginTop: theme.spacing(1.5),
  },

  slider: {
    width: '30%',
  },

  input: {
    marginTop: theme.spacing(0.3),
    width: '100%',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: '1em',

    '& .MuiInputBase-root.Mui-disabled': {
      color: 'black',
    },
  },

  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  spaceButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

function Solver() {
  const classes = useStyles();

  const inputProps={
    classes: {
      input: classes.input,
    },
  };

  const [keywordInput, setKeywordInput] = useState('');
  const [cipherInput, setCipherInput] = useState('');
  const [plaintext, setPlaintext] = useState('');

  const [slider, setSlider] = useState(0);

  function sliderChange(e, newValue) {
    let adjustKeyword = '';
    let adjustPlain = '';

    // Add spaces to the beginning of the word based on slider value
    for (var i = 0; i <= newValue - 1; i++) {
      adjustKeyword = adjustKeyword + ' ';
    }

    adjustKeyword += keywordInput.trim();

    // Decipher and update plaintext result
    for (i = 0; i < adjustKeyword.length; i++) {
      if (adjustKeyword.charAt(i) !== ' ') {
        let newChar = (((cipherInput.toLowerCase().charCodeAt(i)-96) - (adjustKeyword.toLowerCase().charCodeAt(i)-96)));
        newChar >= 0 ? newChar = newChar % 26 : newChar === 0 ? newChar = newChar + 1 : newChar = newChar + 26;
        adjustPlain = adjustPlain + String.fromCharCode(97 + newChar);
      } else {
        adjustPlain = adjustPlain + ' ';
      }
    }

    setPlaintext(adjustPlain);
    setKeywordInput(adjustKeyword);
    setSlider(newValue);
  }

  function keywordChange(e) {
    let adjustPlain = '';
    const keyword = e.target.value;

    // Decipher and update plaintext result
    for (let i = 0; i < keyword.length; i++) {
      if (keyword.charAt(i) !== ' ') {
        let newChar = (((cipherInput.toLowerCase().charCodeAt(i)-96) - (keyword.toLowerCase().charCodeAt(i)-96)));
        newChar >= 0 ? newChar = newChar % 26 : newChar === 0 ? newChar = newChar + 1 : newChar = newChar + 26;
        adjustPlain = adjustPlain + String.fromCharCode(97 + newChar);
      } else {
        adjustPlain = adjustPlain + ' ';
      }
    }

    setKeywordInput(e.target.value);
    setPlaintext(adjustPlain);
  }

  function cipherChange(e) {
    let adjustPlain = '';
    const cipher = e.target.value;

    // Decipher and update plaintext result
    for (let i = 0; i < keywordInput.length; i++) {
      if (keywordInput.charAt(i) !== ' ') {
        let newChar = (((cipher.toLowerCase().charCodeAt(i)-96) - (keywordInput.toLowerCase().charCodeAt(i)-96)));
        newChar >= 0 ? newChar = newChar % 26 : newChar === 0 ? newChar = newChar + 1 : newChar = newChar + 26;
        adjustPlain = adjustPlain + String.fromCharCode(97 + newChar);
      } else {
        adjustPlain = adjustPlain + ' ';
      }
    }

    setCipherInput(e.target.value.toUpperCase());
    setPlaintext(adjustPlain);
  }

  return (
    <div className={classes.body}>
      <div className={classes.keywordSlider}>
        <Slider className={classes.slider} step={1} max={cipherInput && keywordInput ? cipherInput.length - 1 : 0} value={slider} onChange={sliderChange}/>
      </div>
      <div className={classes.textField}>
        <TextField label="Keyword" inputProps={{spellCheck: 'false'}} InputProps={inputProps} value={keywordInput} variant="outlined" className={classes.input} onChange={keywordChange}/>

        <button className={classes.spaceButton} onClick={(e) => setKeywordInput('') & setPlaintext('')}>Clear</button>
        <button className={classes.spaceButton} onClick={(e) => setKeywordInput(keywordInput.replace(/\s+/g, ''))}>Remove Spaces</button>
      </div>

      <div className={classes.textField}>
        <TextField label="Ciphertext" inputProps={{maxLength: 138, spellCheck: 'false'}} InputProps={inputProps} value={cipherInput} variant="outlined" className={classes.input} onChange={cipherChange}/>

        <button className={classes.spaceButton} onClick={(e) => setCipherInput('') & setPlaintext('')}>Clear</button>
        <button className={classes.spaceButton} onClick={(e) => setCipherInput(cipherInput.replace(/\s+/g, ''))}>Remove Spaces</button>
      </div>

      <div className={classes.textField}>
        <TextField disabled label="Plaintext" inputProps={{spellCheck: 'false'}} InputLabelProps={{shrink: true}} InputProps={inputProps} value={plaintext} variant="outlined" className={classes.input}/>
      </div>

      <Probability cipher={cipherInput}/>
    </div>
  );
}

export default Solver;
