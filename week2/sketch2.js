let x, y;
let diameter = 50
let yV = 10, xV = 10

function setup(){
    createCanvas(windowWidth,windowHeight)
    y = diameter/2
    x = width/2


}
function draw(){
  background(100)
  ellipse(x,y, diameter);
  fill(100, 10, 250, 150)

  x += xV
  y += yV

  if(y > height - diameter/2){
    yV = -yV;
  }
  if(y < diameter/2 ){
    yV = -yV;
  }
  if(x>width- diameter/2){
    xV = -xV
  }
  if(x < diameter/2){
    xV = -xV
  }
  print(y)

 
}