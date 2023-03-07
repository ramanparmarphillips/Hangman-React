//===========================================================
//                           IMPORTS
//===========================================================
//CSS
import './App.css'

//React imports
import React, {useState, useEffect} from 'react'

//Components imports
import Header from       './Components/Header'
import Figure from       './Components/Figure'
import WrongLetters from './Components/WrongLetters'
import Word from         './Components/Word'
import Notification from './Components/Notification'
import Popup from        './Components/Popup'

//Helper function imports
import { showNotification as show } from './Helpers/helpers'
//===========================================================


//Array of possible words to be selected by the game
const words = ['jellyfish', 'moose', 'penguin', 'elephant', 'rhinoceros', 'hippopotamus', 'giraffe', 'gorilla', 'kangaroo', 'lemur', 'lion', 'panda', 'polar bear', 'sloth', 'tiger', 'zebra', 'alligator', 'ant', 'bear', 'bee', 'bird', 'camel', 'cat', 'cheetah', 'chicken', 'chimpanzee', 'cow', 'crocodile', 'deer', 'dog', 'dolphin', 'duck', 'eagle', 'elephant', 'fish', 'fly', 'fox', 'frog', 'giraffe', 'goat', 'goldfish', 'hamster', 'hippopotamus', 'horse', 'kangaroo', 'kitten', 'lion', 'lobster', 'monkey', 'octopus', 'owl', 'panda', 'pig', 'puppy', 'rabbit', 'rat', 'scorpion', 'seal', 'shark', 'sheep', 'snail', 'snake', 'spider', 'squirrel', 'tiger', 'turtle', 'wolf', 'zebra']

//Randomly selects a word from the array
let selectedWord = words[Math.floor(Math.random() * words.length)]

//Main App component
function App() {
  //State variables
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  //UseEffect hook
  useEffect(() => {
    const handleKeydown = e => {
      const { key, keyCode } = e
      if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase()
          //Checks if the letter is in the selected word
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter])
          } else {
              show(setShowNotification)
          }
        } else {
            //Checks if the letter is already in the wrong letters array
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter])
          } else {
            show(setShowNotification)
          }
        }
      }
    }
    //Event listener, runs when component mounts to stop event listener from running on every render
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
    }, [correctLetters, wrongLetters, playable]
  )
  
  //Function to reset the game
  function playAgain() {
    setPlayable(true)
    setCorrectLetters([])
    setWrongLetters([])
    const random = Math.floor(Math.random() * words.length)
    selectedWord = words[random]
  }

  //Function to show info box
  function showInfo() {
    document.querySelector('.infoBox').classList.toggle('show')
  }

  //JSX to render the app
  return (
    <>
      <Header />
      <div className='game-container'>
        <Figure wrongLetters = {wrongLetters}/>
        <WrongLetters wrongLetters = {wrongLetters}/>
        <Word
          selectedWord = {selectedWord} 
          correctLetters = {correctLetters}/>
      </div>
      <Popup 
        correctLetters = {correctLetters} 
        wrongLetters = {wrongLetters} 
        selectedWord = {selectedWord} 
        setPlayable = {setPlayable} 
        playAgain = {playAgain}/>
      <Notification showNotification = {showNotification}/>

      <button className = 'reload' onClick = {playAgain}><i className="fa-solid fa-arrows-rotate"></i><br/></button>
      <div className = 'infoBox'><h6>Rules:</h6><p>Press keys on keyboard to guess word. If you pick more than 5 wrong words and the game ends. Press the <i className="fa-solid fa-arrows-rotate"></i> button to restart game.</p></div>
      <button className = 'info' onClick={showInfo}><i className="fa-solid fa-circle-info"></i></button>
    </>
  )
}

export default App
