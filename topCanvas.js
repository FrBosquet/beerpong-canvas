function TopCanvas(){
  this.canvas = document.getElementById('top')
  this.context = this.canvas.getContext('2d')
  this.ballSize = 5
  this.ballSizeVariance = 5
  
  this.paintBackground = () => {
    this.context.fillStyle = 'green'
    this.context.fillRect(0,0,680,320)
  }
  this.paintTable = () => {
    this.context.fillStyle = 'white'
    this.context.strokeStyle = 'black'
    this.context.lineWidth = 1
    this.context.fillRect(100, 60, 540, 200)
    this.context.strokeRect(100, 60, 540, 200)
  }
  
  this.paintTriangle = () => {
    this.context.strokeStyle = 'black'
    this.context.lineWidth = 1
    this.context.fillStyle = 'azure'
    this.context.beginPath()
    this.context.moveTo(480,160)
    this.context.lineTo(620, 80)
    this.context.lineTo(620, 240)
    this.context.closePath()
    this.context.fill()
    this.context.stroke()
  }
  
  this.paintCups = cups => {
    cups.forEach( cup => this.paintCup(cup))
  }

  this.paintCup = ([x, y, z]) => {
    this.context.lineWidth = 2
    this.context.strokeStyle = 'black'
    this.context.fillStyle = 'tan'
    this.context.beginPath()
    this.context.arc(z, x, 15, 0, 2 * Math.PI, false)
    this.context.stroke()
    this.context.fill()

    this.context.lineWidth = 1        
    this.context.beginPath()
    this.context.fillStyle = 'peru'
    this.context.arc(z, x, 8, 0, 2 * Math.PI, false)
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
    this.paintTriangle()
  }
  
  this.paintBall = () => {
    const visibleDiameter = this.ballSize + this.ballSizeVariance * (160 - ballPos[1]) / 160
    
    this.context.lineWidth = 1
    this.context.strokeStyle = 'black'
    this.context.fillStyle = 'white'
    this.context.beginPath()
    this.context.arc(ballPos[2], ballPos[0], visibleDiameter, 0, 2 * Math.PI, false)
    this.context.stroke()
    this.context.fill()
  }
  
  this.paintArrow = () => {
    this.context.strokeStyle = `rgb(${ 255 * (1 - vAngle / 100)}, 0, 0)`
    this.context.lineWidth = 5
    this.context.beginPath()
    const hRadians = ((hAngle/100) * Math.PI) - Math.PI / 2
    const vRadians = ((vAngle/100) * Math.PI) - Math.PI / 2
    const visibleLength = Math.cos(vRadians) * 50
    this.context.moveTo(10, 160)
    this.context.lineTo(
      10 + Math.cos(hRadians) * visibleLength,
      160 + Math.sin(hRadians) * visibleLength
    )
    this.context.stroke()
  }
  
  this.drawForce = ammount => {
    this.context.fillStyle = 'red'
    this.context.fillRect(0, 0, ammount * 680, 3)
  }

  this.updateCanvas = (cups) => {
    this.paintStatics()
    this.paintArrow()
    this.paintCups(cups)
    this.paintBall()
  }
}

const topCanvas = new TopCanvas()
