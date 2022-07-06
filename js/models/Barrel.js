class Barrel {
  constructor() {
    this.initialCoordinates = this.randomPosition();
    this.initialX = this.initialCoordinates.x;
    this.initialY = this.initialCoordinates.y;
    this.x = this.initialX;
    this.y = this.initialY;
    this.movementSpeed = this.resetMovementSpeed();
  }

  preload() {
    this.image = loadImage("assets/barrel.png");
  }

  draw() {
    image(this.image, this.x, this.y, BARREL_WIDTH, BARREL_HEIGHT);
  }

  move() {
    if (this.initialX === -BARREL_WIDTH) {
      this.x += this.movementSpeed;
      if (this.x > CANVAS_WIDTH) {
        this.resetPosition();
      }
    } else if (this.initialX === CANVAS_WIDTH) {
      this.x -= this.movementSpeed;
      if (this.x < -BARREL_WIDTH) {
        this.resetPosition();
      }
    } else if (this.initialY === -BARREL_HEIGHT) {
      this.y += this.movementSpeed;
      if (this.y > CANVAS_HEIGHT) {
        this.resetPosition();
      }
    } else if (this.initialY === CANVAS_HEIGHT) {
      this.y -= this.movementSpeed;
      if (this.y < -BARREL_HEIGHT) {
        this.resetPosition();
      }
    }
  }

  randomPosition() {
    let x = randomN(CANVAS_WIDTH);
    let y = randomN(CANVAS_HEIGHT);

    let xValues = [-BARREL_WIDTH, CANVAS_WIDTH];
    let yValues = [-BARREL_HEIGHT, CANVAS_HEIGHT];

    if (CANVAS_WIDTH - x > CANVAS_HEIGHT - y) {
      y = yValues[randomN(yValues.length)];
    } else {
      x = xValues[randomN(xValues.length)];
    }

    if (x === -BARREL_WIDTH && y === -BARREL_HEIGHT) {
      y = BARREL_HEIGHT;
    }

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
    return (
      Math.random() * BARREL_MAX_MOVEMENT_SPEED + BARREL_MIN_MOVEMENT_SPEED
    );
  }

  isColliding(player) {
    return (
      this.x + BARREL_WIDTH > player.x &&
      this.x < player.x + PLAYER_WIDTH &&
      this.y + BARREL_HEIGHT > player.y &&
      this.y < player.y + PLAYER_HEIGHT
    );
  }
}
