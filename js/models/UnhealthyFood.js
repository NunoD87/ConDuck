class UnhealthyFood extends Food {
  constructor() {
    super();
  }

  preload() {
    let images = [
      "assets/bread.png",
      "assets/cornflakes.png",
      "assets/chips.png",
    ];

    this.image = loadImage(images[Math.floor(Math.random() * images.length)]);
  }
}
