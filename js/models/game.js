class Game {
  constructor() {
    this.player = new Player();
    this.sumos = [];
    this.isSumosCreated = false;
  }

  play() {
    background("aqua");
    this.initializePlayer();
    if (!this.isSumosCreated) {
      this.createSumos();
      this.isSumosCreated = true;
    }
    this.initializeSumos(this.sumos);
  }

  initializePlayer() {
    this.player.draw();
    this.player.move();
  }

  createSumos() {
    for (let i = 0; i < SUMO_QUANTITY; i++) {
      this.sumos.push(new Sumo());
    }
  }

  initializeSumos(sumos) {
    sumos.forEach((sumo) => {
      sumo.draw();
      sumo.move();
    });
  }
}
