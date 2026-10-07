let size = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {

    background(150);
    fill(50, 80, 255);
    strokeWeight(1);
    stroke(200);


    // first grid

    for (let x = 0; x < width; x += 50) {
      for (let y = 0; y < height; y += 50) {

            // find distance between mouse and ellipse
            let d = dist(mouseX, mouseY, x, y);

            if (d < 100) {
                size = 25;
            } else {
        size = 10;
            }
            
            push();
            translate(0, 0);
            ellipse(x, y, size, size);
            pop();
        }
    }

    // secind grid

    for (let x = 0; x < width; x += 50) {
    for (let y = 0; y < height; y += 50) {
    ellipse(x + 25, y + 25, 10, 10);
        }
    }
}
