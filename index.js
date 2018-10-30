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

document.addEventListener('keydown', e => keyMap[e.key] = true)
document.addEventListener('keyup', e => keyMap[e.key] = false)

const INITIAL_POSITION = [10, 160]

let gameState = GAME_STATES.AIMING

let ballPos = [...INITIAL_POSITION]
let angle = 50
let velX = 0
let velY = 0

function inTriangle(x, y){
  const inX = x >= 480 && x <=620
  const yOffset = ((x - 480) / 140) * 80
  const upperLimit = 160 + yOffset
  const lowerLimit = 160 - yOffset
  const inY = y <= upperLimit && y >= lowerLimit
  return inX && inY
}

function isOutside(x, y) {
  return (x < 0 || x > BOARD_WIDTH) || (y < 0 || y > BOARD_HEIGHT)
}

function gameFrame(){
  switch(gameState){
    case GAME_STATES.AIMING:
      if(keyMap['ArrowRight'] && angle < 100) {
        angle ++
      }else if(keyMap['ArrowLeft'] && angle > 0){
        angle --
      }else if(keyMap[' '] && angle >= 0){
        const radians = ((angle/100) * Math.PI) - Math.PI / 2
        velX = Math.cos(radians) * 2
        velY = Math.sin(radians) * 2
        gameState = GAME_STATES.RUNNING
      }
      updateCanvas()
      window.requestAnimationFrame(gameFrame)
      break
    case GAME_STATES.RUNNING:
      ballPos[0] += velX
      ballPos[1] += velY
      updateCanvas()
      if(inTriangle(...ballPos)){
        ballPos = [...INITIAL_POSITION]
        gameState = GAME_STATES.PAUSED
        showMessage('IN TRIANGLE')
      }else if(isOutside(...ballPos)){
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
