import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {TextareaAutosize, Typography, Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  body: {
    margin: 0,
    marginBottom: theme.spacing(8),
  },

  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(1),
  },

  buttons: {
    marginTop: '5px',
    textAlign: 'center',
  },

  buttonMargin: {
    margin: theme.spacing(2),
  },

  input: {
    width: '100%',
    marginTop: theme.spacing(0.5),
    minHeight: '15px',
    resize: 'vertical',
    fontSize: '1.2em',
  },

  alert: {
    width: '250px',
    margin: 'auto',
  },

  spaceButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();

  const inputProps={
    classes: {
      input: classes.input,
    },
  };

  const [keywordInput, setKeywordInput] = useState('');
  const [cipherInput, setCipherInput] = useState('');
  const [plainInput, setPlainInput] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  function encipher() {
    if (!keywordInput || !plainInput) {
      setShowAlert(true);
      setAlertMessage('Please enter plaintext and a key.');
      return;
    } else {
      setShowAlert(false);
    }

    let adjustResult = '';

    for (let i = 0; i < keywordInput.length; i++) {
      if (keywordInput.charAt(i) !== ' ') {
        let newChar = (((plainInput.toLowerCase().charCodeAt(i) % 32) + (keywordInput.toLowerCase().charCodeAt(i) % 32)) - 1);
        newChar = newChar % 26;
        if (newChar === 0) newChar += 26;

        adjustResult = adjustResult + String.fromCharCode(96 + newChar);
      } else {
        adjustResult = adjustResult + ' ';
      }
    }

    setCipherInput(adjustResult.toUpperCase());
  }

  function decipher() {
    if (!cipherInput || !keywordInput) {
      setShowAlert(true);
      setAlertMessage('Please enter ciphertext and a key.');
      return;
    } else {
      setShowAlert(false);
    }

    let adjustResult = '';

    for (let i = 0; i < keywordInput.length; i++) {
      if (keywordInput.charAt(i) !== ' ') {
        let newChar = (((cipherInput.toLowerCase().charCodeAt(i)-96) - (keywordInput.toLowerCase().charCodeAt(i)-96)));
        newChar >= 0 ? newChar = newChar % 26 : newChar === 0 ? newChar = newChar + 1 : newChar = newChar + 26;
        adjustResult = adjustResult + String.fromCharCode(97 + newChar);
      } else {
        adjustResult = adjustResult + ' ';
      }
    }

    setPlainInput(adjustResult);
  }

  // Set keyword to same length as cipher
  function matchLength(){
    if(keywordInput.length > 0){
      setKeywordInput(keywordInput.repeat(Math.ceil(cipherInput.length / keywordInput.length)).substring(0, cipherInput.length))
    }
  }

  return (
    <div className={classes.body}>
      <div className={classes.textField}>
        <Typography variant="h6">Keyword :</Typography>
        <TextareaAutosize inputProps={{spellCheck: 'false'}} InputProps={inputProps} value={keywordInput} variant="outlined" rows={5} className={classes.input} onChange={(e) => setKeywordInput(e.target.value)}/>
        
        <button className={classes.spaceButton} onClick={(e) => setKeywordInput('')}>Clear</button>
        <button className={classes.spaceButton} onClick={(e) => setKeywordInput(keywordInput.replace(/\s+/g, ''))}>Remove Spaces</button>
        <button className={classes.spaceButton} onClick={(e) => matchLength()}>Match Cipher Length</button>
      </div>

      <div className={classes.textField}>
        <Typography variant="h6">Ciphertext :</Typography>
        <TextareaAutosize InputProps={inputProps} value={cipherInput} variant="outlined" rows={5} className={classes.input} onChange={(e) => setCipherInput(e.target.value.toUpperCase())}/>
        
        <button className={classes.spaceButton} onClick={(e) => setCipherInput('')}>Clear</button>
        <button className={classes.spaceButton} onClick={(e) => setCipherInput(cipherInput.replace(/\s+/g, ''))}>Remove Spaces</button>
      </div>

      <div className={classes.textField}>
        <Typography variant="h6">Plaintext :</Typography>
        <TextareaAutosize label="Plaintext" InputProps={inputProps} value={plainInput} variant="outlined" rows={5} className={classes.input} onChange={(e) => setPlainInput(e.target.value)}/>
        
        <button className={classes.spaceButton} onClick={(e) => setPlainInput('')}>Clear</button>
        <button className={classes.spaceButton} onClick={(e) => setPlainInput(plainInput.replace(/\s+/g, ''))}>Remove Spaces</button>
      </div>

      <div className={classes.buttons}>
        {showAlert ?
          <Alert className={classes.alert} severity="error">{alertMessage}</Alert> :
          <Alert style={{opacity: '0%'}}/>
        }
        <Button onClick={(e) => encipher()} className={classes.buttonMargin} size="large" variant="contained" color="primary">Encipher</Button>
        <Button onClick={() => decipher()} className={classes.buttonMargin} size="large" variant="contained">Decipher</Button>
      </div>
    </div>
  );
}

export default App;
