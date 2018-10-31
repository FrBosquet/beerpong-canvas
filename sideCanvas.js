function SideCanvas(){
  this.canvas = document.getElementById('side')
  this.context = this.canvas.getContext('2d')
  this.ballSize = 5
  this.ballSizeVariance = 2
  
  this.paintBackground = () => {
    this.context.fillStyle = 'teal'
    this.context.fillRect(0,0,680,320)
  }
  
  this.paintTable = () => {
    this.context.fillStyle = 'white'
    this.context.strokeStyle = 'black'
    this.context.lineWidth = 1
    this.context.fillRect(100, 260, 540, 10)
    this.context.strokeRect(100, 260, 540, 10)
    this.context.fillStyle = 'black'
    this.context.fillRect(120, 270, 20, 50)
    this.context.fillRect(600, 270, 20, 50)
  }

  this.paintCups = ({cups}) => {
    cups.forEach( cup => this.paintCup(cup))
  }

  this.paintCup = cup => {
    this.context.lineWidth = 2
    this.context.strokeStyle = 'black'
    this.context.fillStyle = 'tan'
    this.context.beginPath()
    this.context.moveTo(cup.z-5, 260)
    this.context.lineTo(cup.z-15, 210)
    this.context.lineTo(cup.z+15, 210)
    this.context.lineTo(cup.z+5, 260)
    this.context.closePath()
    this.context.stroke()
    this.context.fill()

  }
  
  this.clearCanvas = () => {
    this.context.clearRect(0, 0, 680, 320)
  }
  
  this.paintStatics = () => {
    this.clearCanvas()
    this.paintBackground()
    this.paintTable()
  }
  
  this.paintBall = ({ballPosition}) => {
    const visibleDiameter = this.ballSize - this.ballSizeVariance * (160 - ballPosition.x) / 160
    this.context.lineWidth = 1
    this.context.strokeStyle = 'black'
    this.context.fillStyle = 'white'
    this.context.beginPath()
    this.context.arc(ballPosition.z, ballPosition.y, visibleDiameter, 0, 2 * Math.PI, false)
    this.context.stroke()
    this.context.fill()
  }
  
  this.paintArrow = ({hAngle, vAngle}) => {
    this.context.strokeStyle = `rgb(${ 255 * hAngle / 100}, 0, 0)`
    this.context.lineWidth = 5
    this.context.beginPath()
    const hRadians = ((hAngle/100) * Math.PI) - Math.PI / 2
    const vRadians = ((vAngle/100) * Math.PI) - Math.PI / 2
    const visibleLength = Math.cos(hRadians) * 50
    
    this.context.moveTo(10, 160)
    this.context.lineTo(
      10 + Math.cos(vRadians) * visibleLength,
      160 + Math.sin(vRadians) * visibleLength
    )
    this.context.stroke()
  }
  
  this.drawForce = ammount => {
    this.context.fillStyle = 'red'
    this.context.fillRect(0, 0, ammount * 680, 3)
  }

  this.updateCanvas = (state) => {
    this.paintStatics(state)
    this.paintCups(state)
    this.paintArrow(state)
    this.paintBall(state)
    state.force && this.drawForce(state.force)
  }
}

const sideCanvas = new SideCanvas()
