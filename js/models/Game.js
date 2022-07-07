class Game {
  constructor() {
    this.player = new Player();
    this.barrels = this.createBarrels();
    this.foods = this.createFoods();
    this.screens = ["start", "tutorial", "game", "gameWin", "gameOver"];
    this.screen = this.screens[0];
    this.gameInfo = false;
    this.sounds = {
      menu: "assets/menuSound.mp3",
      game: "assets/gameSound.mp3",
      gameOver: "assets/gameOverSound.mp3",
      win: "assets/winSound.mp3",
    };
    this.isSoundPlaying = false;
  }

  preload() {
    this.startBackground = loadImage("assets/giantDuck.jpg");
    this.background = loadImage("assets/background.png");
    this.tutorialScreen = loadImage("assets/tutorial.png");
    this.gameOverScreen = loadImage("assets/gameOverScreen.png");
    this.winScreen = loadImage("assets/winScreen.png");
    this.preloadSounds();
    this.preloadObjects();
  }

  preloadSounds() {
    this.sounds.menu = loadSound(this.sounds.menu);
    this.sounds.game = loadSound(this.sounds.game);
    this.sounds.gameOver = loadSound(this.sounds.gameOver);
    this.sounds.win = loadSound(this.sounds.win);
  }

  preloadObjects() {
    this.player.preload();
    this.barrels.forEach((barrel) => {
      barrel.preload();
    });
    this.foods.forEach((food) => {
      food.preload(food.constructor.name);
    });
  }

  play() {
    this.setVolumes();
    switch (this.screen) {
      case "start":
        this.startScreen();
        break;
      case "tutorial":
        this.tutorial();
        break;
      case "game":
        this.game();
        if (!this.gameInfo) {
          this.gameInfo = true;
          GAME_INFO_DIV.classList.toggle("vh");
        }
        break;
      case "gameOver":
        this.gameOver();
        if (this.gameInfo) {
          this.gameInfo = false;
          GAME_INFO_DIV.classList.toggle("vh");
        }
        break;
      case "gameWin":
        this.gameWin();
        if (this.gameInfo) {
          this.gameInfo = false;
          GAME_INFO_DIV.classList.toggle("vh");
        }
    }
  }

  // * Screens

  startScreen() {
    background(this.startBackground);

    if (!this.sounds.menu.isPlaying()) {
      this.sounds.game.stop();
      this.isSoundPlaying = false;
    }

    if (!this.isSoundPlaying) {
      this.sounds.menu.play();
      this.isSoundPlaying = true;
    }
    if (key === " ") {
      this.screen = this.screens[1];
    }
  }

  tutorial() {
    background(this.background);
    background(this.tutorialScreen);
    if (key === "Enter") {
      this.screen = this.screens[2];
    }
  }

  game() {
    background(this.background);
    if (!this.sounds.game.isPlaying()) {
      this.sounds.menu.stop();
      this.isSoundPlaying = false;
    }

    if (!this.isSoundPlaying) {
      this.sounds.game.loop();
      this.isSoundPlaying = true;
    }

    this.initializePlayer();
    this.initializeBarrels(this.barrels);
    this.initializeFoods(this.foods);
  }

  gameOver() {
    background(this.gameOverScreen);
    if (!this.sounds.gameOver.isPlaying()) {
      this.sounds.game.stop();
      this.isSoundPlaying = false;
    }

    if (!this.isSoundPlaying) {
      this.sounds.gameOver.play();
      this.isSoundPlaying = true;
    }
    if (key === "Enter") {
      this.screen = this.screens[0];
      this.restart();
    }
  }

  gameWin() {
    background(this.winScreen);
    if (!this.sounds.win.isPlaying()) {
      this.sounds.game.stop();
      this.isSoundPlaying = false;
    }

    if (!this.isSoundPlaying) {
      this.sounds.win.play();
      this.isSoundPlaying = true;
    }
    if (key === "Enter") {
      this.screen = this.screens[0];
      this.restart();
    }
  }

  // * Player

  initializePlayer() {
    this.player.draw();
    this.player.move();

    if (this.player.isBouncing) {
      this.player.bounce();
    }
  }

  // * Barrels

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

      if (barrel.isColliding(this.player)) {
        this.player.bounce();
      }
    });
  }

  // * Food

  createFoods() {
    let arr = [];

    for (let i = 0; i < FOOD_QUANTITY; i++) {
      arr.push(new HealthyFood());
    }

    for (let i = 0; i < FOOD_QUANTITY; i++) {
      arr.push(new UnhealthyFood());
    }

    for (let i = 0; i < FOOD_QUANTITY; i++) {
      arr.push(new DeadlyFood());
    }

    return arr;
  }

  initializeFoods(foods) {
    foods.forEach((food) => {
      food.draw();
      food.move();
      let hundredLevel = Math.floor(this.player.weight / 100);
      this.player.hundredLevel = hundredLevel;

      switch (food.constructor.name) {
        case "HealthyFood":
          if (food.isColliding(this.player)) {
            this.player.weight += FOOD_GRAMS;
            if (this.player.weight === 2000) {
              this.screen = this.screens[3];
            }
            this.createNewFood(food);
          }
          break;
        case "UnhealthyFood":
          if (food.isColliding(this.player)) {
            this.player.weight -= FOOD_GRAMS;
            hundredLevel = this.player.weight / 100;
            if (hundredLevel < this.player.hundredLevel) {
              this.player.hundredLevel = hundredLevel;
              if (this.player.die()) {
                this.screen = this.screens[4];
              }
            }
            this.createNewFood(food);
          }
          break;
        case "DeadlyFood":
          if (food.isColliding(this.player)) {
            if (this.player.die()) {
              this.screen = this.screens[4];
            } else {
              this.createNewFood(food);
            }
          }
          break;
      }
    });
  }

  createNewFood(food) {
    this.foods = this.foods.filter((foodF) => {
      return foodF !== food;
    });

    let newFood;

    switch (food.constructor.name) {
      case "HealthyFood":
        newFood = new HealthyFood();
        this.foods.push(newFood);
        break;
      case "UnhealthyFood":
        newFood = new UnhealthyFood();
        this.foods.push(newFood);
        break;
      case "DeadlyFood":
        newFood = new DeadlyFood();
        this.foods.push(newFood);
        break;
    }

    newFood.preload();
  }

  setVolumes() {
    this.sounds.menu.setVolume(0.1);
    this.sounds.game.setVolume(0.1);
    this.sounds.gameOver.setVolume(0.1);
    this.sounds.win.setVolume(0.1);
  }

  restart() {
    this.player = new Player();
    this.barrels = this.createBarrels();
    this.foods = this.createFoods();
    this.preloadObjects();
  }
}
