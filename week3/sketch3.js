let spiralSize = 0;
let lerpedMouseX = 0;
let lerpedMouseY = 0;

function setup() {
createCanvas(windowWidth, windowHeight);

    lerpedMouseX = mouseX;
    lerpedMouseY = mouseY;

    fill(150, 150, 250);
    stroke(0);
    strokeWeight(1);
}

function draw() {
  background(0);

lerpedMouseX = lerp(lerpedMouseX, mouseX, 0.1);
  lerpedMouseY = lerp(lerpedMouseY, mouseY, 0.1);

    if (mouseIsPressed) {
spiralSize = lerp(spiralSize, 80, 0.1);
    } else {
    spiralSize = lerp(spiralSize, 0, 0.1);
    }

    translate(lerpedMouseX, lerpedMouseY);
    for (let i = 0; i < spiralSize; i++) {

        push();
        rotate(i * 30);
        translate(i * 2, 0);
        ellipse(0, 0, 8, 8);
        pop();
    }

}
