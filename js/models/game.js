class Game {
  constructor() {
    this.player = new Player();
  }

  play() {
    background("aqua");
    this.initializePlayer();
  }

  initializePlayer() {
    this.player.draw();
    this.player.move();
  }
}
