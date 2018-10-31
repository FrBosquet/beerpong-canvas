function Vector(x, y, z){
  this.x = x
  this.y = y
  this.z = z

  this.getAsArray = () => {
    return [this.x, this.y, this.z]
  }

  this.clone = () => {
    return new Vector(this.x, this.y, this.z)
  }

  this.add = vector => {
    return new Vector(
      this.x + vector.x,
      this.y + vector.y,
      this.z + vector.z,
      )
  }

  this.factor = vector => {
    return new Vector(
      this.x * vector.x,
      this.y * vector.y,
      this.z * vector.z
    )
  }
  this.getHorizontalDistance = vector => {
    const dx = this.x - vector.x
    const dz = this.z - vector.z
    return Math.sqrt(dx * dx + dz * dz)
  }
}

function Game(config = {
  boardWidth: 680,
  boardHeight: 320,
  gravity: 0.02,
  maxForce: 5,
  tableHorizontalSeparation: 100,
  tableLength: 540,
  tableDeepSeparation: 60,
  tableWidth: 200,
  worldLength: 680,
  worldWidth: 320,
  cupHeight: 50,
  tableHeight: 255
}){
  this.GAME_STATES = {
    AIMING: 'AIMING',
    POWER: 'POWER',
    RUNNING: 'RUNNING',
    PAUSED: 'PAUSED'
  }
  this.BOARD_WIDTH = config.boardWidth
  this.BOARD_HEIGHT = config.boardWidth
  this.MAX_FORCE = config.maxForce
  this.GRAVITY = config.gravity
  this.INITIAL_POSITION = new Vector(160, 160, 10)
  this.INITIAL_CUPS = [
    new Vector(109,0,605),
    new Vector(126,0,575),
    new Vector(143,0,605),
    new Vector(143,0,545),
    new Vector(160,0,515),
    new Vector(160,0,575),
    new Vector(177,0,605),
    new Vector(177,0,545),
    new Vector(194,0,575),
    new Vector(211,0,605),]
  this.TABLE_Z_START = config.tableHorizontalSeparation
  this.TABLE_Z_END = config.tableHorizontalSeparation + config.tableLength
  this.TABLE_X_START = config.tableDeepSeparation
  this.TABLE_X_END = config.tableDeepSeparation + config.tableWidth
  this.WORLD_Z_END = config.worldLength
  this.WORLD_X_END = config.worldWidth
  this.CUP_HEIGHT = config.cupHeight
  this.TABLE_HEIGHT = config.tableHeight
  this.CUP_START = config.tableHeight - config.cupHeight
  this.REBOUND_VECTOR = new Vector(1, -0.6, 1)

  this.message = null
  this.keySet = {}
  this.gameState = this.GAME_STATES.AIMING
  this.ballPos = this.INITIAL_POSITION.clone()
  this.hAngle = 50
  this.vAngle = 50
  this.speed = new Vector(0, 0, 0)
  this.cups = [ ...this.INITIAL_CUPS]
  this.msPower = null
  this.force = null

  this.update = () => {
    switch(this.gameState){
      case this.GAME_STATES.AIMING:
        this.handleAiming()
        break
      case this.GAME_STATES.POWER:
        this.handlePower()
        break
      case this.GAME_STATES.RUNNING:
        this.handleRunning()
        break
    }
  }

  this.handleAiming = () => {
    if(this.keySet['ArrowRight'] && this.hAngle < MAX_H_ANGLE) this.hAngle ++ 
    if(this.keySet['ArrowLeft'] && this.hAngle > MIN_H_ANGLE) this.hAngle -- 
    if(this.keySet['ArrowUp'] && this.vAngle > MIN_V_ANGLE) this.vAngle --
    if(this.keySet['ArrowDown'] && this.vAngle < MAX_V_ANGLE) this.vAngle ++
    if(this.keySet[' ']){
      this.msPower = Date.now()
      this.setGamestate(this.GAME_STATES.POWER)
    }
  }

  this.handlePower = () => {
    const delta = Date.now() - this.msPower
    const gauge = (delta % 2000) / 1000
    const totalForce = this.MAX_FORCE * (gauge < 1 ? gauge : 2 - gauge)
    this.force = totalForce / this.MAX_FORCE 

    if(!this.keySet[' ']){
      const hRadians = ((this.hAngle/100) * Math.PI) - Math.PI / 2
      const vRadians = ((this.vAngle/100) * Math.PI) - Math.PI / 2
      const vForce = Math.sin(vRadians) * totalForce
      const hForce = Math.cos(vRadians) * totalForce

      const velY = vForce
      const velZ = Math.cos(hRadians) * hForce
      const velX = Math.sin(hRadians) * hForce
      this.setSpeed(new Vector(velX, velY, velZ))
      this.setGamestate(this.GAME_STATES.RUNNING)
      this.force = null
    }
  }

  this.handleRunning = () => {
    this.moveBallPosition(this.speed)
    this.applyGravity()
    if(this.isTouchingTable(this.ballPos)){
      this.rebound()
      this.putBallOver(this.TABLE_HEIGHT)
    }

    if(this.isInTriangle(this.ballPos)){
      if(this.ballPos.y > 215){
        this.setGamestate(this.GAME_STATES.PAUSED, 'FAULT!!')
      }else{
        const touchedCup = this.cups.find(cup => cup.getHorizontalDistance(this.ballPos) < 15)
        if(touchedCup){
          this.cups = cups.filter(cup => cup !== touchedCup)
          this.setGamestate(this.GAME_STATES.PAUSED, 'SCORE!!')
        }else{
          this.rebound()
          this.putBallOver(210)
        }
      }
    }else if(this.isOutside(this.ballPos) || this.hasFall(this.ballPos)){
      this.setGamestate(this.GAME_STATES.PAUSED, 'OUT!!')
    }
  }

  this.getGameState = () => {
    return {
      speed: this.speed,
      state: this.gameState,
      cups: this.cups,
      ballPosition: this.ballPos,
      hAngle: this.hAngle,
      vAngle: this.vAngle,
      force: this.force,
      message: this.message
    }
  }

  this.isTouchingTable = vector => {
    return this.isOverTable(vector) && vector.y > this.TABLE_HEIGHT
  }

  this.isOverTable = vector => {
    return (
      vector.z < this.TABLE_Z_END && vector.z > this.TABLE_Z_START
    ) && (
      vector.x < this.TABLE_X_END && vector.x > this.TABLE_X_START
    )
  }

  this.isInTriangle = vector => {
    const inZ = vector.z >= 500 && vector.z <=620
    const inY = vector.y >= 210 && vector.y <=260
    const xOffset = ((vector.z - 480) / 140) * 80
    const upperLimit = 160 + xOffset
    const lowerLimit = 160 - xOffset
    const inX = vector.x <= upperLimit && vector.x >= lowerLimit && vector.x > 94 && vector.x < 226 
    return inZ && inX && inY
  }

  this.isOutside = vector => {
    return (
      vector.z <= 0 || vector.z >= this.WORLD_Z_END
    ) || (
      vector.x <= 0 || vector.x >= this.WORLD_X_END
    )
  }

  this.hasFall = vector => {
    return vector.y > 290
  }

  this.moveBallPosition = vector => {
    this.ballPos = this.ballPos.add(vector)
  }

  this.applyGravity = () => {
    this.speed = this.speed.add(new Vector(0, this.GRAVITY ,0))
  }

  this.resetBallPosition = () => {

    this.ballPos = this.INITIAL_POSITION.clone()
    console.log(this.ballPos)
  }

  this.setGamestate = (state, message = null) => {
    this.gameState = state
    this.message = message
  }

  this.putBallOver = y => {
    this.ballPos = new Vector(
      this.ballPos.x,
      y,
      this.ballPos.z
    )
  }

  this.rebound = () => {
    this.setSpeed(this.speed.factor(this.REBOUND_VECTOR))
  }

  this.setSpeed = vector => {
    this.speed = vector
  }

  this.setKey = key => {
    this.keySet[key] = true
  }

  this.unsetKey = key => {
    this.keySet[key] = false
  }
}