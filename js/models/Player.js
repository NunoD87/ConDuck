class Player {
  constructor() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2 - PLAYER_HEIGHT / 2;
    this.lives = 3;
    this.isRespawning = false;
    this.respawningTimer = 0;
  }

  preload() {
    this.image = loadImage("assets/player.png");
  }

  draw() {
    image(this.image, this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    if (this.isRespawning) {
      this.respawning();
    }
  }

  move() {
    if (keyIsDown(ARROW_UP) || keyIsDown(W)) {
      this.y -= PLAYER_MOVEMENT_SPEED;
      if (this.y < -PLAYER_HEIGHT) {
        this.resetPosition();
        this.isRespawning = true;
      }
    } else if (keyIsDown(ARROW_DOWN) || keyIsDown(S)) {
      this.y += PLAYER_MOVEMENT_SPEED;
      if (this.y > CANVAS_HEIGHT) {
        this.resetPosition();
        this.isRespawning = true;
      }
    }

    if (keyIsDown(ARROW_LEFT) || keyIsDown(A)) {
      this.x -= PLAYER_MOVEMENT_SPEED;
      if (this.x < -PLAYER_WIDTH) {
        this.resetPosition();
        this.isRespawning = true;
      }
    } else if (keyIsDown(ARROW_RIGHT) || keyIsDown(D)) {
      this.x += PLAYER_MOVEMENT_SPEED;
      if (this.x > CANVAS_WIDTH) {
        this.resetPosition();
        this.isRespawning = true;
      }
    }
  }

  resetPosition() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2 - PLAYER_HEIGHT / 2;
  }

  respawning() {
    if (this.respawningTimer % 5 === 0) {
      push();
      tint(0, 0, 0);
      image(this.image, this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
      pop();
    } else {
      noTint();
    }

    this.respawningTimer++;

    if (this.respawningTimer === 50) {
      this.isRespawning = false;
      this.respawningTimer = 0;
    }
  }

  die() {
    this.resetPosition();
    this.isRespawning = true;
  }
}