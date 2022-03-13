import Dice from './components/Dice'
import Header from './components/Header'
import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [newGame, setNewGame] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [highscore, setHighscore] = React.useState(
    JSON.parse(localStorage.getItem('highscore') || 40)
  )

  React.useEffect(() => {
    const allDieIsHeld = dice.every((die) => die.isHeld)
    const allDieIsSame = dice.every((die) => die.value === dice[0].value)
    if (allDieIsHeld && allDieIsSame) {
      setNewGame(true)
      if (rolls <= highscore) {
        setHighscore(rolls)
        localStorage.setItem('highscore', JSON.stringify(rolls))
      }
    }
  }, [dice, rolls, highscore])

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
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = React.useState({
      width: undefined,
      height: undefined,
    })
    React.useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      // Add event listener
      window.addEventListener('resize', handleResize)
      // Call handler right away so state gets updated with initial window size
      handleResize()
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }, []) // Empty array ensures that effect is only run on mount
    return windowSize
  }

  const { width, height } = useWindowSize()
  return (
    <div className="App">
      {newGame && <Confetti width={width} height={height} />}
      <Header />
      <div className="dice-container">{diceElement}</div>
      {newGame && <div className="rolls-counter">Rolls: {rolls}</div>}
      {newGame && (
        <div className="bestRolls-counter">Best rolls: {highscore}</div>
      )}
      <button className="roll-btn" onClick={rollDice}>
        {newGame ? 'New Game' : 'Roll'}
      </button>
    </div>
  )
}

export default App
