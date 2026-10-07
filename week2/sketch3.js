let x = 0 
let y = 0;

let x2 = 200
let y2 = 200

let xSpeed = 3
let ySpeed = 5

let xSpeed2 = 3
let ySpeed2 = 5

let diameter = 50

let colour = 0
let colour2 = 100

function setup(){
    createCanvas(windowWidth,windowHeight)
    // x=width


}
function draw(){
  background(255,0,100)


  ellipse(x,y,diameter)

  // x=x+1
  //  y=y+1

  x = x + xSpeed
  // y+= ySpeed
  y = y + ySpeed

  fill(colour)

  if(x>width){
    xSpeed = -xSpeed 
   colour = random (0, 255)
   
  }

   if(x<0){
    xSpeed = -xSpeed 
    colour = random (0,255)
  }


  if(y>height){
 ySpeed = -ySpeed
   colour = random (0,255)
  }

  if (y<0) {
    ySpeed = -ySpeed
       colour = random (0,255)
  }

// Ball 2
   fill(colour2)
   ellipse(x2,y2,diameter)

  // x=x+1
  //  y=y+1

  x2 = x2 + xSpeed2
  y2+= ySpeed2


  if(x2>width){
    xSpeed2 = -xSpeed2
   colour2 = random (0, 255)
   
  }

   if(x2<0){
    xSpeed2 = -xSpeed2 
    colour2 = random (0,255)
  }


  if(y2>height){
 ySpeed2 = -ySpeed2
     colour2 = random (0,255)
  }

  if (y2<0) {
    ySpeed2 = -ySpeed2
        colour2 = random (0,255)
  }
 
 
}