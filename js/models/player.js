class Player {
  constructor() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2 - PLAYER_HEIGHT / 2;
  }

  draw() {
    rect(this.x, this.y, 50, 50);
    fill("red");
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= MOVEMENT_SPEED;

      if (this.x < -PLAYER_WIDTH) {
        this.resetPosition();
      }
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += MOVEMENT_SPEED;
      if (this.x > CANVAS_WIDTH) {
        this.resetPosition();
      }
    }

    if (keyIsDown(UP_ARROW)) {
      this.y -= MOVEMENT_SPEED;
      if (this.y < -PLAYER_HEIGHT) {
        this.resetPosition();
      }
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += MOVEMENT_SPEED;
      if (this.y > CANVAS_HEIGHT) {
        this.resetPosition();
      }
    }
  }

  resetPosition() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2 - PLAYER_HEIGHT / 2;
  }
}
