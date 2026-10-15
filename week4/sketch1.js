let tileSize = 31
let rows = 14
let columns = 20

p5.disableFriendlyErrors = true; 
let bDoExportSvg = false; 

function setup() {
  createCanvas(576, 384);
  background (255);
  noFill();
  stroke(0);
  rectMode(CENTER)
}

function draw() {

if (bDoExportSvg){
    // Begin exporting, if requested
    beginRecordSvg(this, "plotSvg.svg");
  }
//   background(220);
  randomSeed (40)
  let maxAngle = map(mouseY, 0, height, 0, PI)

  for(let row = 0; row<rows; row++){
    for(let column = 0; column<columns; column++){
      let x = tileSize*column + tileSize/2;
      let y = tileSize*row + tileSize/2;

      push()
      translate(x, y)
      drawSq(row, maxAngle)
      pop()
    
    }
}
    if (bDoExportSvg){
    // End exporting, if doing so
    endRecordSvg();
    bDoExportSvg = false;
  }

}
function drawSq(row, angle){
 let maxAngle = map(row, 0, rows-1, 0, angle);
  let angleValue = random (-maxAngle, maxAngle)
  rotate (angleValue)
  rect(0, 0, 30, 30)
}

function keyPressed(){
  if (key === 's'){
    // Initiate SVG exporting
    bDoExportSvg = true; 
    redraw();
  }
}
