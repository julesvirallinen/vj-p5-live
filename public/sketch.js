let circles = [];
let globs = [];
let amount = 10;
let maxWidth = 300;
let img;
let ball;
let glob;
let kill = false;

function preload() {
  ball = new Ball();
}

function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  print(windowHeight);
  noFill();
  glob = new Glob(300, 300);
}

function draw() {
  background(60, 67, 91, 0.1);

  for (let i = circles.length - 1; i >= 0; i--) {
    if (circles[i].show()) {
      circles.splice(i, 1);
    }
  }
  for (let i = globs.length - 1; i >= 0; i--) {
    if (globs[i].show()) {
      globs.splice(i, 1);
    }
  }
}

function mouseClicked() {
  circles.push(new GrowingCircle(mouseX, mouseY));
  for (let i = 0; i < 10; i++) {
    globs.push(new Glob(mouseX, mouseY));
  }
}

class Glob {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.noiseX = random(0, 1000);
    this.noiseY = random(0, 1000);
    this.noiseInc = 0.03;
    this.lifeLeft = 300;
    this.col = random(0, 255);
    this.diameter = random(1, 50);
  }

  show() {
    noStroke();
    fill(this.col, 87, 87);
    this.col++;

    ellipse(this.x, this.y, this.diameter);
    this.x += map(noise(this.noiseX), 0, 1, -5, 5);
    this.y += map(noise(this.noiseY), 0, 1, -5, 5);

    this.noiseX += this.noiseInc;
    this.noiseY += this.noiseInc;
    this.lifeLeft -= 1;
    if (this.lifeLeft <= 0) {
      return true; // kill
    }
    return false;
  }
}

class Ball {
  constructor() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.velocityX = random(2, 5);
    this.velocityY = random(2, 5);
    this.diameter = 10;
    this.col = 0;
  }

  show() {
    stroke(this.col, 255, 255);
    this.col++;
    ellipse(this.x, this.y, this.diameter);

    if (this.x + 5 >= windowWidth || this.x - 5 <= 0) {
      this.velocityX = -this.velocityX;
    }

    if (this.y + 5 >= windowHeight || this.y - 5 <= 0) {
      this.velocityY = -this.velocityY;
    }

    var distance;

    for (let i = circles.length - 1; i >= 0; i--) {
      distance = abs(
        sqrt(pow(this.x - circles[i].x, 2) + pow(this.y - circles[i].y, 2))
      );
      if (distance <= circles[i].diameter / 2) {
        this.velocityX = -this.velocityX;
        this.velocityY = -this.velocityY;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }
    }
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}

class GrowingCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 2;
    this.inc = random(1, 4);
    this.opacity = 1;
  }

  show() {
    noFill();
    stroke(0, 100, 100, this.opacity);
    this.opacity -= 0.01;
    ellipse(this.x, this.y, this.diameter, this.diameter);
    this.diameter += this.inc;

    // delete if no longer visible
    if (this.opacity <= 0) {
      return true;
    }
    return false;
  }
}
