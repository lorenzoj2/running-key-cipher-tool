import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize, Typography, Button} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  body: {
    margin: 0,
    marginBottom: theme.spacing(8),
  },

  textField: {
    margin: '20px 20px 0px 20px',
  },

  buttons: {
    marginTop: '20px',
    textAlign: 'center',
  },

  buttonMargin: {
    margin: theme.spacing(2)
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
    margin: "auto",
  }
}));

function App() {
  const classes = useStyles();

  const inputProps={
    classes: {
      input: classes.input,
    },
  };

  const [keywordInput, setKeywordInput] = useState("")
  const [cipherInput, setCipherInput] = useState("")
  const [plainInput, setPlainInput] = useState("")

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  function encipher(e){
    if(!keywordInput || !plainInput){
      setShowAlert(true)
      setAlertMessage("Please enter plaintext and a key.")
      return
    }
    else{
      setShowAlert(false)
    }

    var adjustResult = "";

    for(var i = 0; i < keywordInput.length; i++){
      if(keywordInput.charAt(i) !== " "){
        let newChar = (((plainInput.toLowerCase().charCodeAt(i) % 32) + (keywordInput.toLowerCase().charCodeAt(i) % 32)) - 1)
        newChar = newChar % 26
        if(newChar === 0) newChar += 26;
        
        adjustResult = adjustResult + String.fromCharCode(96 + newChar)
      }
      else{
        adjustResult = adjustResult + " "
      }
    }

    setCipherInput(adjustResult.toUpperCase())
  }

  function decipher(){
    if(!cipherInput || !keywordInput){
      setShowAlert(true)
      setAlertMessage("Please enter ciphertext and a key.")
      return
    }
    else{
      setShowAlert(false)
    }

    var adjustResult = "";

    for(var i = 0; i < keywordInput.length; i++){
      if(keywordInput.charAt(i) !== " "){
        let newChar = (((cipherInput.toLowerCase().charCodeAt(i)-96) - (keywordInput.toLowerCase().charCodeAt(i)-96)))
        newChar >= 0 ? newChar = newChar % 26 : newChar === 0 ? newChar = newChar + 1 : newChar = newChar + 26
        adjustResult = adjustResult + String.fromCharCode(97 + newChar)
      }
      else{
        adjustResult = adjustResult + " "
      }
    }

    setPlainInput(adjustResult)
  }

  return (
    <div className={classes.body}>
      <div className={classes.textField}>
            <Typography variant="h6">Keyword :</Typography>
            <TextareaAutosize inputProps={{spellCheck: "false"}} InputProps={inputProps} value={keywordInput} variant="outlined" rows={5} className={classes.input} onChange={(e) => setKeywordInput(e.target.value)}/>
      </div>

      <div className={classes.textField}>
            <Typography variant="h6">Ciphertext :</Typography>
            <TextareaAutosize InputProps={inputProps} value={cipherInput} variant="outlined" rows={5} className={classes.input} onChange={(e) => setCipherInput(e.target.value.toUpperCase())}/>
      </div>

      <div className={classes.textField}>
            <Typography variant="h6">Plaintext :</Typography>
            <TextareaAutosize InputProps={inputProps} value={plainInput} variant="outlined" rows={5} className={classes.input} onChange={(e) => setPlainInput(e.target.value)}/>
      </div>

      <div className={classes.buttons}>
        {showAlert ?
          <Alert className={classes.alert} severity="error">{alertMessage}</Alert> :
          <Alert style={{opacity: "0%"}}/>
        }
        <Button onClick={(e) => encipher(e)} className={classes.buttonMargin} size="large" variant="contained" color="primary">Encipher</Button>
        <Button onClick={() => decipher()} className={classes.buttonMargin} size="large" variant="contained">Decipher</Button>
      </div>
    </div>
  );
}

export default App;
