
let frames = [];
let frameIndex = 0;

let playerX = 40;
let playerY;
let playerW = 50;
let playerH = 65;

let velocityY = 0;
let gravity = 0.5;
let jumpPower = -12;
let jumping = false;

let moveLeft = false;
let moveRight = false;
let speed = 3;  

let currentPlatform = 0;
let previousBottom = 0;

let platforms = [
  { x: 20,  y: 330, w: 110, h: 20, c: [255, 150, 180] },
  { x: 150, y: 285, w: 140, h: 20, c: [255, 180, 110] },
  { x: 310, y: 230, w: 170, h: 20, c: [135, 210, 180] },
  { x: 500, y: 165, w: 180, h: 20, c: [160, 170, 255] }
];

function preload() {
  for (let i = 1; i <= 12; i++) {
    frames.push(
      loadImage("walk_cycle_png_sequence/" + i + ".png")
    );
  }
}

function setup() {
  createCanvas(700, 420);
  playerY = platforms[0].y - playerH;
}

function draw() {
  // Colourful background
  background(100, 200, 200);

  // draw pltforms
  for (let p of platforms) {
    fill(p.c[0], p.c[1], p.c[2]);
    stroke(50);
    strokeWeight();
    rect(p.x, p.y, p.w, p.h);
  }

  // horizontal movt
  if (moveLeft) {
    playerX -= speed;
  }

  if (moveRight) {
    playerX += speed;
  }

  playerX = constrain(playerX, 0, width - playerW);

  // jumping plus fallinggg
  if (jumping) {
    previousBottom = playerY + playerH;
 
    velocityY += gravity;
    playerY += velocityY;

    // Check for landing on a platform
    if (velocityY > 0) {
      for (let i = 0; i < platforms.length; i++) {
        let p = platforms[i];
        let currentBottom = playerY + playerH;

        if (
          previousBottom <= p.y &&
          currentBottom >= p.y &&
          playerX + playerW > p.x &&
          playerX < p.x + p.w
        ) {
          playerY = p.y - playerH;
          velocityY = 0;
          jumping = false;
          currentPlatform = i;

          // Change the platform's colour on landing
          p.c = [
            random(80, 255),
            random(80, 255),
            random(80, 255)
          ];

          break;
        }
      }
    }

    // little guyy inside the canvas
    if (playerY > height) {
      playerY = platforms[currentPlatform].y - playerH;
      velocityY = 0;
      jumping = false;
    }
  } else {
    // stand on the current platform
    playerY = platforms[currentPlatform].y - playerH;
  }

  // animating the 12 walk-cycle images
  if (frameCount % 6 === 0) {
    frameIndex = (frameIndex + 1) % frames.length;
  }

  // flip the image to face left when moving left
  imageMode(CORNER);

  push();

  if (moveLeft) {
    translate(playerX + playerW, playerY);
    scale(-1, 1);
    image(frames[frameIndex], 0, 0, playerW, playerH);
  } else {
    image(frames[frameIndex], playerX, playerY, playerW, playerH);
  }

  pop();

  // instructions
//   fill(40, 40, 70);
//   noStroke();
//   textSize(14);
//   text("LEFT / RIGHT: move     space: jump", 20, 25);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    moveLeft = true;
  }

  if (keyCode === RIGHT_ARROW) {
    moveRight = true;
  }

  if (key === " " && !jumping) {
    velocityY = jumpPower;
    jumping = true;
  }

  return false;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    moveLeft = false;
  }

  if (keyCode === RIGHT_ARROW) {
    moveRight = false;
  }

  return false;
}
















