class Player {
  constructor() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2 - PLAYER_HEIGHT / 2;
    this.lives = 3;
  }

  preload() {
    this.image = loadImage("assets/player.png");
  }

  draw() {
    image(this.image, this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  }

  move() {
    if (keyIsDown(ARROW_UP) || keyIsDown(W)) {
      this.y -= PLAYER_MOVEMENT_SPEED;
      if (this.y < -PLAYER_HEIGHT) {
        this.resetPosition();
      }
    } else if (keyIsDown(ARROW_DOWN) || keyIsDown(S)) {
      this.y += PLAYER_MOVEMENT_SPEED;
      if (this.y > CANVAS_HEIGHT) {
        this.resetPosition();
      }
    }

    if (keyIsDown(ARROW_LEFT) || keyIsDown(A)) {
      this.x -= PLAYER_MOVEMENT_SPEED;
      if (this.x < -PLAYER_WIDTH) {
        this.resetPosition();
      }
    } else if (keyIsDown(ARROW_RIGHT) || keyIsDown(D)) {
      this.x += PLAYER_MOVEMENT_SPEED;
      if (this.x > CANVAS_WIDTH) {
        this.resetPosition();
      }
    }
  }

  resetPosition() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2 - PLAYER_HEIGHT / 2;
  }
}
