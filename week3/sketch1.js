// let x = 0;
// let lerpedMouseX = 0;
// let lerpedMouseY = 0;

function setup(){

    createCanvas(600,700);
    rectMode(CENTER);
}
 
function draw(){

    background(0);
    stroke(255);
    strokeWeight(2);
    fill(150, 40, 40);

// 1st building

    push();
    translate (600, 600)
    rect(0, 0, 100, 300)
    pop()

    push();
    translate (700, 800)
    rect(0, 0, 100, 100)
    pop()
    
// 2nd building

 push();
    translate (500, 650)
    rect(0, 0, 100, 300)
    pop()

//3 building
    
    push();
    translate (400, 600)
    rect(0, 0, 50, 1000)
    pop()
    
// 4 building

    push();
    translate (300, 900)
    rect(0, 0, 40, 900)
    pop()

    // 5 building

    push();
    translate (200, 600)
    rect(0, 0, 40, 900)
    pop()

    // 6 building

    push();
    translate (150, 500)
    rect(0, 0, 80, 800)
    pop()


push();
    translate (90, 650)
    rect(0, 0, 100, 300)
    pop()

   //stars
    // nested loops and then translate

    for (let x = 0; x < width; x += 50) {

        for (let y = 0; y < height ; y += 100) {

            push();
            translate(x + random(100, 10), y + random(100, -10));
            fill(100);
            noStroke();
            ellipse(0, 0, 2, 2);
            pop();
        }
    }

    //circle(windowWidth/2,windowHeight/2,50);
}