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

  this.paintCups = cups => {
    cups.forEach( cup => this.paintCup(cup))
  }

  this.paintCup = ([x, y, z]) => {
    this.context.lineWidth = 2
    this.context.strokeStyle = 'black'
    this.context.fillStyle = 'tan'
    this.context.beginPath()
    this.context.moveTo(z-5, 260)
    this.context.lineTo(z-15, 210)
    this.context.lineTo(z+15, 210)
    this.context.lineTo(z+5, 260)
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
  
  this.paintBall = () => {
    const visibleDiameter = this.ballSize - this.ballSizeVariance * (160 - ballPos[0]) / 160
    this.context.lineWidth = 1
    this.context.strokeStyle = 'black'
    this.context.fillStyle = 'white'
    this.context.beginPath()
    this.context.arc(ballPos[2], ballPos[1], visibleDiameter, 0, 2 * Math.PI, false)
    this.context.stroke()
    this.context.fill()
  }
  
  this.paintArrow = () => {
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
  
  this.updateCanvas = (cups) => {
    this.paintStatics()
    this.paintCups(cups)
    this.paintArrow()
    this.paintBall()
  }
}

const sideCanvas = new SideCanvas()
