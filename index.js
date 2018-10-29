let keyMap = {}

document.addEventListener('keydown', e => keyMap[e.key] = true)
document.addEventListener('keyup', e => keyMap[e.key] = false)

const INITIAL_POSITION = [10, 100]

let ballPos = [...INITIAL_POSITION]
let arrow = 0

function inTriangle(x, y){
  const inX = x >= 480 && x <=620
  const yOffset = ((x - 480) / 140) * 80
  const upperLimit = 160 + yOffset
  const lowerLimit = 160 - yOffset
  const inY = y <= upperLimit && y >= lowerLimit
  return inX && inY
}

function frame(){
  ballPos[0] = ballPos[0] + 2
  updateCanvas()
  if(inTriangle(...ballPos)){
    ballPos = [...INITIAL_POSITION]
  }

  if(keyMap['ArrowRight'] && arrow < 100) {
    arrow ++
  }else if(keyMap['ArrowLeft'] && arrow > 0){
    arrow --
  }

  window.requestAnimationFrame(frame)
}

frame()
