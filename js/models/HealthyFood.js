class HealthyFood extends Food {
  constructor() {
    super();
  }

  preload() {
    let images = ["assets/lettuce.png", "assets/rice.png", "assets/seeds.png"];

    this.image = loadImage(images[randomN(images.length)]);
  }
}
