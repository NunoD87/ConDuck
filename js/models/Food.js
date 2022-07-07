class Food {
  constructor() {
    this.initialCoordinates = this.randomPosition();
    this.initialX = this.initialCoordinates.x;
    this.initialY = this.initialCoordinates.y;
    this.x = this.initialX;
    this.y = this.initialY;
    this.movementSpeed = this.resetMovementSpeed();
  }

  draw() {
    image(this.image, this.x, this.y, FOOD_WIDTH, FOOD_HEIGHT);
  }

  move() {
    if (this.initialX <= -FOOD_WIDTH) {
      this.x += this.movementSpeed;
      if (this.x > CANVAS_WIDTH) {
        this.resetPosition();
      }
    } else if (this.initialX >= CANVAS_WIDTH) {
      this.x -= this.movementSpeed;
      if (this.x < -FOOD_WIDTH) {
        this.resetPosition();
      }
    } else if (this.initialY <= -FOOD_HEIGHT) {
      this.y += this.movementSpeed;
      if (this.y > CANVAS_HEIGHT) {
        this.resetPosition();
      }
    } else if (this.initialY >= CANVAS_HEIGHT) {
      this.y -= this.movementSpeed;
      if (this.y < -FOOD_HEIGHT) {
        this.resetPosition();
      }
    }
  }

  isColliding(player) {
    if (player.isRespawning) {
      return false;
    }

    if (
      this.x + FOOD_WIDTH > player.x &&
      this.x < player.x + PLAYER_WIDTH &&
      this.y + FOOD_HEIGHT > player.y &&
      this.y < player.y + PLAYER_HEIGHT
    ) {
      return true;
    }
  }

  randomPosition() {
    let x = randomN(CANVAS_WIDTH);
    let y = randomN(CANVAS_HEIGHT);

    let xValues = [-(FOOD_WIDTH * 4), CANVAS_WIDTH + FOOD_WIDTH * 3];
    let yValues = [-(FOOD_HEIGHT * 4), CANVAS_HEIGHT + FOOD_HEIGHT * 3];

    if (CANVAS_WIDTH - x > CANVAS_HEIGHT - y) {
      y = yValues[randomN(yValues.length)];
    } else {
      x = xValues[randomN(xValues.length)];
    }

    if (x === -FOOD_WIDTH && y === -FOOD_HEIGHT) {
      y = FOOD_HEIGHT;
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
    return Math.random() * FOOD_MAX_MOVEMENT_SPEED + FOOD_MIN_MOVEMENT_SPEED;
  }
}
