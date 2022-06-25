class Game {
  constructor() {
    this.player = new Player();
    this.barrels = this.createBarrels();
    this.foods = this.createFoods();
    this.isGameOver = false;
  }

  preload() {
    this.background = loadImage("assets/background.png");
    this.player.preload();
    this.barrels.forEach((barrel) => {
      barrel.preload();
    });
    this.foods.forEach((food) => {
      food.preload(food.constructor.name);
    });
  }

  play() {
    if (!this.isGameOver) {
      background(this.background);
      this.initializePlayer();
      this.initializeBarrels(this.barrels);
      this.initializeFoods(this.foods);
    } else {
      background(150);
      textAlign(CENTER);
      text("GAME OVER", width / 2, height / 2);
    }
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
              this.isGameOver = true;
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
}
