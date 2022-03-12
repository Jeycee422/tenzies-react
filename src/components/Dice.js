export default function Dice(prop) {
  const style = {
    backgroundColor: prop.isHeld ? '#59e391' : 'white',
  }
  return (
    <div className="dice" onClick={prop.toggle} style={style}>
      {prop.value}
    </div>
  )
}
