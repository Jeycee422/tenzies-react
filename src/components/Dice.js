import Dicesix from './Dices/Dice_six'
import Dicefive from './Dices/Dice_five'
import Dicefour from './Dices/Dice_four'
import Dicethree from './Dices/Dice_three'
import Dicetwo from './Dices/Dice_two'

export default function Dice(prop) {
  const style = {
    backgroundColor: prop.isHeld ? '#59e391' : 'white',
  }
  // •
  return (
    <div className="dice" onClick={prop.toggle} style={style}>
      {prop.value === 6 && <Dicesix />}
      {prop.value === 5 && <Dicefive />}
      {prop.value === 4 && <Dicefour />}
      {prop.value === 3 && <Dicethree />}
      {prop.value === 2 && <Dicetwo />}
      {prop.value === 1 && <span className="pip"></span>}
    </div>
  )
}
