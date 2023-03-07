//React imports
import React, {useEffect} from 'react'
//Helper function imports
import {checkWin} from '../Helpers/helpers'

//Popup component
const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  //Checks if the game is won or lost
  if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
    finalMessage = 'Congratulations! You won!';
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
    finalMessage = 'Oh no! You lost.';
    finalMessageRevealWord = `The word was: ${selectedWord}!`;
    playable = false;
  }

  //UseEffect hook
  useEffect(() => setPlayable(playable));

  //JSX to render the popup
  return (
    <>
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again?</button>
      </div>
    </div>
      
    </>
  )
}

export default Popup
