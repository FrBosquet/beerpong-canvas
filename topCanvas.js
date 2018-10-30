function TopCanvas(){
  this.canvas = document.getElementById('top')
  this.context = this.canvas.getContext('2d')
  
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
    this.context.lineWidth = 1
    this.context.strokeStyle = 'black'
    this.context.fillStyle = 'white'
    this.context.beginPath()
    this.context.arc(ballPos[2], ballPos[0], 5, 0, 2 * Math.PI, false)
    this.context.stroke()
    this.context.fill()
  }
  
  this.paintArrow = () => {
    this.context.strokeStyle = 'red'
    this.context.lineWidth = 5
    this.context.beginPath()
    const radians = ((hAngle/100) * Math.PI) - Math.PI / 2
    this.context.moveTo(10, 160)
    this.context.lineTo(
      10 + Math.cos(radians) * 50,
      160 + Math.sin(radians) * 50
    )
    this.context.stroke()
  }
  
  this.updateCanvas = () => {
    this.paintStatics()
    this.paintArrow()
    this.paintBall()
  }
}

const topCanvas = new TopCanvas()
