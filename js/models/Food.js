class Food {
  constructor() {
    this.initialCoordinates = this.randomPosition();
    this.initialX = this.initialCoordinates.x;
    this.initialY = this.initialCoordinates.y;
    this.x = this.initialX;
    this.y = this.initialY;
    this.movementSpeed = this.resetMovementSpeed();
  }

  preload(foodType) {
    switch (foodType) {
      case "HealthyFood":
        this.image = loadImage("assets/lettuce.png");
        break;
      case "UnhealthyFood":
        this.image = loadImage("assets/bread.png");
        break;
      case "DeadlyFood":
        this.image = loadImage("assets/donut.png");
        break;
    }
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

  randomPosition() {
    let x = Math.floor(Math.random() * CANVAS_WIDTH);
    let y = Math.floor(Math.random() * CANVAS_HEIGHT);

    let xValues = [-(FOOD_WIDTH * 4), CANVAS_WIDTH + FOOD_WIDTH * 3];
    let yValues = [-(FOOD_HEIGHT * 4), CANVAS_HEIGHT + FOOD_HEIGHT * 3];

    if (CANVAS_WIDTH - +x < CANVAS_HEIGHT - y) {
      x = xValues[Math.floor(Math.random() * xValues.length)];
    } else if (CANVAS_WIDTH - x > CANVAS_HEIGHT - y) {
      y = yValues[Math.floor(Math.random() * yValues.length)];
    } else {
      x = xValues[Math.floor(Math.random() * xValues.length)];
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
