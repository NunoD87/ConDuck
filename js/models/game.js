class Game {
  constructor() {
    this.player = new Player();
    this.barrels = this.createBarrels();
  }

  preload() {
    this.player.preload();
    this.barrels.forEach((barrel) => {
      barrel.preload();
    });
    this.background = loadImage("assets/background.png");
  }

  play() {
    background(this.background);
    this.initializePlayer();
    this.initializeBarrels(this.barrels);
  }

  initializePlayer() {
    this.player.draw();
    this.player.move();
  }

  createBarrels() {
    let arr = [];
    for (let i = 0; i < BARREL_QUANTITY; i++) {
      arr.push(new Barrel());
    }
    return arr;
  }

  initializeBarrels(barrels) {
    barrels.forEach((barrel) => {
      barrel.draw();
      barrel.move();
      barrel.isColliding(this.player);
    });
  }
}
