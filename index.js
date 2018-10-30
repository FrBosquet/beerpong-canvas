let keyMap = {}
const message = document.getElementById('message')

function hideMessage(){
  message.style.display = 'none'
}

function showMessage(msg){
  message.style.display = 'flex'
  message.querySelector('h1').innerText = msg
}

const GAME_STATES = {
  AIMING: 'AIMING',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED'
}
const BOARD_WIDTH = 680
const BOARD_HEIGHT = 320
const GRAVITY = 0.02

document.addEventListener('keydown', e => keyMap[e.key] = true)
document.addEventListener('keyup', e => keyMap[e.key] = false)

const INITIAL_POSITION = [160, 160, 10]

let gameState = GAME_STATES.AIMING

let ballPos = [...INITIAL_POSITION]
let hAngle = 50
let vAngle = 50
let velZ = 0
let velX = 0
let velY = 0

function isInTriangle(x, y, z){
  const inZ = z >= 480 && z <=620
  const xOffset = ((z - 480) / 140) * 80
  const upperLimit = 160 + xOffset
  const lowerLimit = 160 - xOffset
  const inX = x <= upperLimit && x >= lowerLimit
  return inZ && inX
}

function isOutside(x, y, z) {
  return (z <= 0 || z >= BOARD_WIDTH) || (x <= 0 || x >= BOARD_HEIGHT)
}

function isInTable(x, y, z) {
  return (z < 640 && z > 100) && (x < 260 && x > 60)  
}

function gameFrame(){
  switch(gameState){
    case GAME_STATES.AIMING:
      if(keyMap['ArrowRight'] && hAngle < 80) {
        hAngle ++
      }else if(keyMap['ArrowLeft'] && hAngle > 20){
        hAngle --
      }else if(keyMap[' ']){
        const hRadians = ((hAngle/100) * Math.PI) - Math.PI / 2
        const vRadians = ((vAngle/100) * Math.PI) - Math.PI / 2
        
        let totalForce = 2
        let vForce = Math.sin(vRadians) * totalForce
        let hForce = Math.cos(vRadians) * totalForce

        velY = vForce
        velZ = Math.cos(hRadians) * hForce
        velX = Math.sin(hRadians) * hForce
        gameState = GAME_STATES.RUNNING
      }else if(keyMap['ArrowUp'] && vAngle > 0 ) {
        vAngle --
      }else if(keyMap['ArrowDown'] && vAngle < 100 ) {
        vAngle ++
      }
      topCanvas.updateCanvas()
      sideCanvas.updateCanvas()
      window.requestAnimationFrame(gameFrame)
      break
    case GAME_STATES.RUNNING:
      ballPos[0] += velX
      ballPos[1] += velY
      ballPos[2] += velZ
      velY += GRAVITY

      if(ballPos[1] > 255 && isInTable(...ballPos)){
        ballPos[1] = 255
        velY *= -0.95
      }

      topCanvas.updateCanvas()
      sideCanvas.updateCanvas()
      if(isInTriangle(...ballPos)){
        ballPos = [...INITIAL_POSITION]
        gameState = GAME_STATES.PAUSED
        showMessage('IN TRIANGLE')
      }else if(isOutside(...ballPos) || (ballPos[1] > 290)){
        ballPos = [...INITIAL_POSITION]
        gameState = GAME_STATES.paused
        showMessage('OUT!')

      }
      window.requestAnimationFrame(gameFrame)
      break
    default:
      setTimeout(() => {
        hideMessage()
        gameState = GAME_STATES.AIMING
        window.requestAnimationFrame(gameFrame)
      }, 1800)
  }
}

hideMessage()
gameFrame()
