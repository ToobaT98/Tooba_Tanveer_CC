function setup(){
    createCanvas(windowWidth,windowHeight)
    background(100)

    // fill(100,0,0)
    // noStroke()
    strokeWeight(10)
    // stroke(200,100,0)
    

}
function draw(){
stroke (random(255), random(255), random(255))
    line(pmouseX,pmouseY,mouseX,mouseY)

}