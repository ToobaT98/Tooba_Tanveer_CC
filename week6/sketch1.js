// ---------- Sketch 1: bubbles stored in an array ----------
let bubbles = [];
let colors = [
  [242, 194, 48],
  [240, 123, 43],
  [217, 54, 47],
  [106, 61, 154],
  [30, 159, 203]
];

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 12; i++) {
    bubbles.push(new Bubble(random(width), random(height)));
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 60);
    this.speed = random(0.5, 2);
    this.col = random(colors);
  }
  move() {
    this.y -= this.speed;
    this.x += random(-1, 1);
  }
  show() {
    let c = color(this.col);
    c.setAlpha(150);
    fill(c);
    stroke(255);
    strokeWeight(2);
    circle(this.x, this.y, this.size);
  }
  isOffScreen() {
    return this.y < -this.size;
  }
  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.size / 2;
  }
}

function draw() {
  background(20, 30, 60);

  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].move();
    bubbles[i].show();
    if (bubbles[i].isOffScreen()) {
      bubbles.splice(i, 1);
    }
  }
  if (frameCount % 40 === 0) {
    bubbles.push(new Bubble(random(width), height + 30));
  }
}

function mousePressed() {
  clickBubbles();
}

function clickBubbles() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
      window.location.href = 'sketch2.html';   // popped one -> go fly with the birds
      return;
    }
  }
  bubbles.push(new Bubble(mouseX, mouseY));
}

function keyPressed() {
  if (key === 'c' || key === 'C') bubbles = [];
}























