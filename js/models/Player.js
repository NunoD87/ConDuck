class Player {
  constructor() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2 - PLAYER_HEIGHT / 2;
    this.lives = PLAYER_LIVES;
    this.isRespawning = false;
    this.respawningTimer = 0;
    this.score = 1000;
  }

  preload() {
    this.image = loadImage("assets/player.png");
  }

  draw() {
    image(this.image, this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    if (this.isRespawning) {
      this.respawning();
    }
    PLAYER_SCORE_SPAN.innerText = this.score;
    switch (this.lives) {
      case 3:
        PLAYER_LIVES_SPAN.innerText = "❤️❤️❤️";
        break;
      case 2:
        PLAYER_LIVES_SPAN.innerText = "❤️❤️";
        break;
      case 1:
        PLAYER_LIVES_SPAN.innerText = "❤️";
        break;
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

    if (this.respawningTimer === PLAYER_RESPAWN_TIME) {
      this.isRespawning = false;
      this.respawningTimer = 0;
    }
  }

  die() {
    this.lives--;

    if (this.lives === 0) {
      PLAYER_LIVES_SPAN.innerText = "";
      return true;
    }

    this.resetPosition();
    this.isRespawning = true;
    return false;
  }
}
