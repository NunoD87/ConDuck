class HealthyFood extends Food {
  constructor() {
    super();
  }

  isColliding(player) {
    return (
      this.x + FOOD_WIDTH > player.x &&
      this.x < player.x + PLAYER_WIDTH &&
      this.y + FOOD_HEIGHT > player.y &&
      this.y < player.y + PLAYER_HEIGHT
    );
  }
}
