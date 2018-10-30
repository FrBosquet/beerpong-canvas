function SideCanvas(){
  this.canvas = document.getElementById('side')
  this.context = this.canvas.getContext('2d')
  
  this.paintBackground = () => {
    this.context.fillStyle = 'green'
    this.context.fillRect(0,0,680,320)
  }
  
  this.paintTable = () => {
    this.context.fillStyle = 'white'
    this.context.strokeStyle = 'black'
    this.context.lineWidth = 1
    this.context.fillRect(100, 260, 540, 10)
    this.context.strokeRect(100, 260, 540, 10)
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
    this.context.lineWidth = 1
    this.context.strokeStyle = 'black'
    this.context.fillStyle = 'white'
    this.context.beginPath()
    this.context.arc(ballPos[1], ballPos[0], 5, 0, 2 * Math.PI, false)
    this.context.stroke()
    this.context.fill()
  }
  
  this.paintArrow = () => {
    this.context.strokeStyle = 'red'
    this.context.lineWidth = 5
    this.context.beginPath()
    const radians = ((angle/100) * Math.PI) - Math.PI / 2
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

const sideCanvas = new SideCanvas()
