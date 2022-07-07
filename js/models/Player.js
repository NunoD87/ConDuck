class Player {
  constructor() {
    this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2 - PLAYER_HEIGHT / 2;
    this.lives = PLAYER_LIVES;
    this.isRespawning = false;
    this.respawningTimer = 0;
    this.weight = 1000;
    this.hundredLevel;
    this.isBouncing = false;
    this.bouncingDirection = false;
    this.bouncingTimer = 0;
  }

  preload() {
    this.image = loadImage("assets/player.png");
  }

  draw() {
    image(this.image, this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    if (this.isRespawning) {
      this.respawning();
    }
    PLAYER_WEIGHT_SPAN.innerText = this.weight;
    PLAYER_WEIGHT_BAR.value = getPercentage(this.weight);
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

  bounce() {
    if (!this.bouncingDirection) {
      this.bouncingDirection = Math.round(Math.random() * 8 + 1);
    }

    console.log(this.bouncingDirection);
    this.isBouncing = true;
    this.bouncingTimer++;

    switch (this.bouncingDirection) {
      case 1:
        this.y -= PLAYER_BOUNCE_SPEED;
        break;
      case 2:
        this.y += PLAYER_BOUNCE_SPEED;
        break;
      case 3:
        this.x -= PLAYER_BOUNCE_SPEED;
        break;
      case 4:
        this.x += PLAYER_BOUNCE_SPEED;
        break;
      case 5:
        this.y -= PLAYER_BOUNCE_SPEED;
        this.x -= PLAYER_BOUNCE_SPEED;
        break;
      case 6:
        this.y -= PLAYER_BOUNCE_SPEED;
        this.x += PLAYER_BOUNCE_SPEED;
        break;
      case 7:
        this.y += PLAYER_BOUNCE_SPEED;
        this.x -= PLAYER_BOUNCE_SPEED;
        break;
      case 8:
        this.y += PLAYER_BOUNCE_SPEED;
        this.x += PLAYER_BOUNCE_SPEED;
        break;
    }

    if (
      this.x < -PLAYER_WIDTH ||
      this.x > CANVAS_WIDTH ||
      this.y < -PLAYER_HEIGHT ||
      this.y > CANVAS_HEIGHT
    ) {
      this.isBouncing = false;
      this.bouncingDirection = false;
      this.bouncingTimer = 0;
      this.resetPosition();
      this.isRespawning = true;
    }

    if (this.bouncingTimer === PLAYER_BOUNCE_TIME) {
      this.isBouncing = false;
      this.bouncingDirection = false;
      this.bouncingTimer = 0;
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
