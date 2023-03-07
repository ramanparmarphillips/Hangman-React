//React imports
import React from 'react'

//Header component
const Header = () => {
  return (
    <>
      <div className='header-container'>
        <h1>Hangman</h1>
        <p>Guess the word by entering letter, but be careful! More than 5 wrong guesses and the game is over!</p>
      </div>
    </>
  )
}

export default Header
