import React, {useState} from 'react';
import './App.css';

function App() {
  const [cipher, setCipher] = useState("");
  const [cipherLength, setCipherLength] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [keywordSlider, setKeywordSlider] = useState("")
  const [result, setResult] = useState("");
  const [slider, setSlider] = useState(0);

  function handleKeywordChange(e) {
    setKeyword(e.target.value)
    setKeywordSlider(e.target.value)
  }

  function handleCipherChange(e) {
    setCipher(e.target.value.toUpperCase().replace(/\s/g, ''))
    setCipherLength(e.target.value.length);
  }

  function handleSlider(e){
    var adjustKeyword = "";
    var adjustResult = "";
    var i;
    
    for(i = 0; i < e.target.value-1; i++){
      adjustKeyword = adjustKeyword + "\u00A0"
    }
    adjustKeyword += keyword

    for(i = 0; i < adjustKeyword.length; i++){
      if(adjustKeyword.charAt(i) !== "\u00A0"){
        let newChar = (((cipher.toLowerCase().charCodeAt(i)-96) - (adjustKeyword.toLowerCase().charCodeAt(i)-96)))
        newChar >= 0 ? newChar = newChar % 26 : newChar === 0 ? newChar = newChar + 1 : newChar = newChar + 26
        adjustResult = adjustResult + String.fromCharCode(97 + newChar)
      }
      else{
        adjustResult = adjustResult + "\u00A0"
      }
    }

    setKeywordSlider(adjustKeyword)
    setResult(adjustResult)
    setSlider(e.target.value)
  }

  console.log("keyword", keyword.toLowerCase().charCodeAt(0)-96)
  console.log("cipher", cipher.toLowerCase().charCodeAt(0)-96)

  let test = (cipher.toLowerCase().charCodeAt(0)-96) - (keyword.toLowerCase().charCodeAt(0)-96)
  console.log("test", test > 0 ? test % 26 : test + 26)

  return (
    <div>
      <header>
        <p className="keyword">Keyword: &ensp;{keywordSlider}</p>        
        <p className="cipher">Cipher : &ensp;{cipher}</p>
        <p className="result">Result : &ensp;{result}</p>
        {slider}
        <input type="range" min="1" max={cipherLength} value={slider} id="cipherRange" onChange={(e) => handleSlider(e)}/>
        <form>
          <label htmlFor="keyword">Keyword: </label>
          <input type="text" name="keyword" onChange={(e) => handleKeywordChange(e)}/>

          <label htmlFor="cipher"> Cipher: </label>
          <input type="text" name="cipher" onChange={(e) => handleCipherChange(e)}/>
        </form>
      </header>
    </div>
  );
}

export default App;
