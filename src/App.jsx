import { useState } from "react";
import "./App.css";

function App() {
const [word, setWord] =useState("SPECTACULAR")
const [hangmanState, setHangmanState] = useState(0);
const [wordState, setWordState] = useState([
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
  ]);

const handleDifficultyChange=(chosenWord)=>{
setWord(chosenWord)
setHangmanState(0)
setWordState(Array(chosenWord.length).fill("_"))
const letters = document.getElementsByClassName("letterbutton");
const lettersArr = [...letters];
lettersArr.forEach((letter) => {
  letter.classList.remove("red");
  letter.classList.remove("green");
  letter.disabled = false;
});
}

  return (
    <section>
    <Game  handleDifficultyChange = {handleDifficultyChange}/>
      <Buttons hangmanState = {hangmanState} setHangmanState = {setHangmanState} wordState = {wordState} word={word} setWordState={setWordState}/>

    </section>
  );
}


function Buttons({word, wordState, setWordState, hangmanState, setHangmanState}) {


  
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const handleClick = (event) => {
    if (hangmanState < 11) {
        if (word.includes(event.target.innerHTML)) {
          console.log("the letter is in the word!");
          event.target.classList.add("green");
          setWordState(() => {
            const updatedWordArr = [...wordState];
            for (let i = 0; i < word.length; i++) {
              if (word[i] === event.target.innerHTML) {
                updatedWordArr[i] = event.target.innerHTML;
              }
            }
            if (!updatedWordArr.includes("_")) {
              console.log("word complete!");
              setHangmanState("winner");
            }
            return updatedWordArr;
          });
        } else {
          console.log("the letter is not in the word!");
          event.target.classList.add("red");
          setHangmanState(() => {
            if (hangmanState < 11) {
              return hangmanState + 1;
            } else {
              return hangmanState;
            }
          });
        }
        event.target.disabled = true;
      }
    }


  return (
    <section id="main">
    
      <div className="flex-item" id="buttonDiv">
        <section id = "letterButtons">
        {alphabet.map((letter) => {
          return (
            <button className="letterbutton" onClick={handleClick} key={letter}>
              {letter.toUpperCase()}
            </button>
          );
        })}
        </section>
        <WordToComplete
          wordState={wordState}
        />
      </div>
      <div className="flex-item" id="hangmanDiv">
        <Hangman hangmanState={hangmanState} />
      </div>
    </section>
  );
}

function WordToComplete({  wordState }) {
  return (
    <section id="word">
      {wordState.map((letter, index) => {
        return <span key={index}>{letter} </span>;
      })}
    </section>
  );
}

function Hangman({ hangmanState }) {
  return (
    <section id="hangman">
      <img src={"/" + hangmanState + ".png"} alt="hangman image" />
    </section>
  );
}

function Game({handleDifficultyChange}) {
const handleClick = (event) =>{

let chosenWord =""
const easyArray = ['PICKLE', 'FLOWER', 'TABLE']
const funArray = ['INTRICATE', 'GRANDPARENT', 'PECULIAR']
const trickyArray = ['EXUBERANT', 'CZAR', 'SYNDICATE']
if(event.target.innerHTML ==="Easy"){
chosenWord = easyArray[Math.floor(Math.random()*easyArray.length)]
}
else if (event.target.innerHTML === "Fun") {
    chosenWord = funArray[Math.floor(Math.random()*funArray.length)]
  } else if (event.target.innerHTML === "Horribly tricky") {
    chosenWord = trickyArray[Math.floor(Math.random()*trickyArray.length)]
  }
  handleDifficultyChange(chosenWord)
}


  return (
    <section id="header">
      <div id="title">
      <h1 id="titleText">Hangman</h1>
      <p id="text">Choose a difficulty level, then guess the word before the man gets hanged!</p>
      </div>
      <div id="difficulty">
      <h4> Choose a difficulty level:</h4>
      <div id="buttons">
      <button onClick={handleClick} className="game">Easy</button>
      <button onClick={handleClick}  className="game">Fun</button>
      <button onClick={handleClick}  className="game">Horribly tricky</button>
      </div>
      </div>
    </section>
  );
}
export default App;