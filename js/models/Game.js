class Game {
  constructor() {
    this.player = new Player();
    this.barrels = this.createBarrels();
    this.foods = this.createFoods();
    this.screens = ["start", "tutorial", "game", "gameOver"];
    this.screen = this.screens[0];
  }

  preload() {
    this.startBackground = loadImage("assets/giantDuck.jpg");
    this.background = loadImage("assets/background.png");
    this.tutorialScreen = loadImage("assets/tutorial.png");
    this.gameOverScreen = loadImage("assets/gameOverScreen.png");
    this.preloadObjects();
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
    switch (this.screen) {
      case "start":
        this.startScreen();
        break;
      case "tutorial":
        this.tutorial();
        break;
      case "game":
        this.game();
        break;
      case "gameOver":
        this.gameOver();
        break;
    }
  }

  // * Screens

  startScreen() {
    background(this.startBackground);
    if (key === " ") {
      this.screen = this.screens[1];
    }
  }

  tutorial() {
    background(this.tutorialScreen);
    if (key === "Enter") {
      this.screen = this.screens[2];
    }
  }

  game() {
    background(this.background);
    this.initializePlayer();
    this.initializeBarrels(this.barrels);
    this.initializeFoods(this.foods);
  }

  gameOver() {
    background(this.gameOverScreen);
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

      switch (food.constructor.name) {
        case "HealthyFood":
          if (food.isColliding(this.player)) {
            this.player.score += FOOD_GRAMS;
            this.createNewFood(food);
          }
          break;
        case "UnhealthyFood":
          if (food.isColliding(this.player)) {
            this.player.score -= FOOD_GRAMS;
            this.createNewFood(food);
          }
          break;
        case "DeadlyFood":
          if (food.isColliding(this.player)) {
            if (this.player.die()) {
              this.screen = this.screens[3];
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

  restart() {
    this.player = new Player();
    this.barrels = this.createBarrels();
    this.foods = this.createFoods();
    this.preloadObjects();
  }
}
