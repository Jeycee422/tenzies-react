import Dice from './components/Dice'
import Header from './components/Header'
import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [newGame, setNewGame] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)

  React.useEffect(() => {
    const allDieIsHeld = dice.every((die) => die.isHeld)
    const allDieIsSame = dice.every((die) => die.value === dice[0].value)
    if (allDieIsHeld && allDieIsSame) {
      setNewGame(true)
    }
  }, [dice])

  console.log(newGame)

  function generateDice() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }
  }
  function allNewDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateDice())
    }
    return diceArray
  }

  function toggleDice(id) {
    if (!newGame) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        })
      )
    }
  }

  function rollDice() {
    setRolls(rolls + 1)
    if (newGame) {
      setDice(allNewDice())
      setNewGame(false)
      setRolls(0)
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateDice()
      })
    )
  }

  const diceElement = dice.map((die) => {
    return (
      <Dice
        key={die.id}
        value={die.value}
        toggle={() => toggleDice(die.id)}
        isHeld={die.isHeld}
      />
    )
  })
  return (
    <div className="App">
      {newGame && <Confetti />}
      <Header />
      <div className="dice-container">{diceElement}</div>
      {newGame && <div className="rolls-counter">Rolls: {rolls}</div>}
      <button className="roll-btn" onClick={rollDice}>
        {newGame ? 'New Game' : 'Roll'}
      </button>
    </div>
  )
}

export default App
