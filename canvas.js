const topCanvas = document.getElementById('top')
const topCtx = topCanvas.getContext('2d')

function paintBackground(){
  topCtx.fillStyle = 'green'
  topCtx.fillRect(0,0,680,320)
}

function paintTable(){
  topCtx.fillStyle = 'white'
  topCtx.fillRect(100, 60, 540, 200)
}

function paintTriangle(){
  topCtx.strokeStyle = 'black'
  topCtx.lineWidth = 1
  topCtx.fillStyle = 'azure'
  topCtx.beginPath()
  topCtx.moveTo(480,160)
  topCtx.lineTo(620, 80)
  topCtx.lineTo(620, 240)
  topCtx.closePath()
  topCtx.fill()
  topCtx.stroke()
}

function clearCanvas(){
  topCtx.clearRect(0, 0, 680, 320)
}

function paintStatics(){
  clearCanvas()
  paintBackground()
  paintTable()
  paintTriangle()
}

function paintBall(){
  topCtx.lineWidth = 1
  topCtx.strokeStyle = 'black'
  topCtx.fillStyle = 'white'
  topCtx.beginPath()
  topCtx.arc(ballPos[0], ballPos[1], 5, 0, 2 * Math.PI, false)
  topCtx.stroke()
  topCtx.fill()
}

function paintArrow(){
  topCtx.strokeStyle = 'red'
  topCtx.lineWidth = 5
  topCtx.beginPath()
  const angle = ((arrow/100) * Math.PI) - Math.PI / 2
  topCtx.moveTo(10, 160)
  topCtx.lineTo(
    10 + Math.cos(angle) * 50,
    160 + Math.sin(angle) * 50
  )
  topCtx.stroke()
}

function updateCanvas(){
  paintStatics()
  paintArrow()
  paintBall()
}
