class Sumo {
  constructor() {
    this.initialCoordinates = this.randomPosition();
    this.initialX = this.initialCoordinates.x;
    this.initialY = this.initialCoordinates.y;
    this.x = this.initialX;
    this.y = this.initialY;
    this.movementSpeed =
      Math.random() * SUMO_MAX_MOVEMENT_SPEED + SUMO_MIN_MOVEMENT_SPEED;
  }

  draw() {
    push();
    fill("orange");
    ellipse(this.x, this.y, 50, 50);
    pop();
  }

  move() {
    if (this.initialX === -SUMO_WIDTH) {
      this.x += this.movementSpeed;
      if (this.x > CANVAS_WIDTH) {
        this.resetPosition();
      }
    } else if (this.initialX === CANVAS_WIDTH) {
      this.x -= this.movementSpeed;
      if (this.x < -SUMO_WIDTH) {
        this.resetPosition();
      }
    } else if (this.initialY === -SUMO_HEIGHT) {
      this.y += this.movementSpeed;
      if (this.y > CANVAS_HEIGHT) {
        this.resetPosition();
      }
    } else if (this.initialY === CANVAS_HEIGHT) {
      this.y -= this.movementSpeed;
      if (this.y < -SUMO_HEIGHT) {
        this.resetPosition();
      }
    }
  }

  randomPosition() {
    let x = Math.floor(Math.random() * CANVAS_WIDTH);
    let y = Math.floor(Math.random() * CANVAS_HEIGHT);

    let xValues = [-SUMO_WIDTH, CANVAS_WIDTH];
    let yValues = [-SUMO_HEIGHT, CANVAS_HEIGHT];

    if (CANVAS_WIDTH - +x < CANVAS_HEIGHT - y) {
      x = xValues[Math.floor(Math.random() * xValues.length)];
    } else if (CANVAS_WIDTH - x > CANVAS_HEIGHT - y) {
      y = yValues[Math.floor(Math.random() * yValues.length)];
    } else {
      x = xValues[Math.floor(Math.random() * xValues.length)];
    }

    if (x === -SUMO_WIDTH && y === -SUMO_HEIGHT) {
      y = SUMO_HEIGHT;
    }

    console.log("x: ", x, " y: ", y);
    return { x, y };
  }

  resetPosition() {
    this.initialCoordinates = this.randomPosition();
    this.initialX = this.initialCoordinates.x;
    this.initialY = this.initialCoordinates.y;
    this.x = this.initialX;
    this.y = this.initialY;
    this.resetMovementSpeed();
  }

  resetMovementSpeed() {
    this.movementSpeed =
      Math.random() * SUMO_MAX_MOVEMENT_SPEED + SUMO_MIN_MOVEMENT_SPEED;
    console.log("movementSpeed: ", this.movementSpeed);
  }
}
