import React, { useEffect, useState } from 'react'
import Die from './die'
import {nanoid} from 'nanoid'

export default function App() {

  const [dice, setDice] = useState(allNewDice)

  const [tenzies, setTenzies] = useState(false);

useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)

  if(allHeld && allSameValue) {
    setTenzies(true)
    console.log("you won")
  }
}, [dice])

    function allNewDice() {
    
    const newDice = []
    for(let i = 0; i < 10; i++) {
    newDice.push({value: Math.ceil(Math.random() * 6), 
      isHeld: false, id: nanoid()})
    }

    return newDice
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : {value: Math.ceil(Math.random() * 6), 
        isHeld: false, id: nanoid()}
    }))
  }

const diceElement = dice.map(die => <Die 
  key={die.id} value={die.value} isHeld={die.isHeld}
  holdDice={() => holdDice(die.id)} />)

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : 
      die
    }))
  }




  return(
    <div className=''>
      <main>
        <h1 className='title'>Tenzies</h1>
        <p className='instruction'>Roll until all dice are the same. Click each die
          to freeze it at its current value between rolls.
        </p>
        <div className='dice-container'>
          {diceElement}
        </div>
        <button onClick={rollDice} 
        className='roll-dice'>
          {tenzies ? "New Game" : 'Roll'}</button>
      </main>
    </div>
  )
}