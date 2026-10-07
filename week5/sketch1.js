
const PINCH   = 7;    // shape of arms: 2 = diamond, 7 = hairline star
const COPIES  = 2;    // how many rings per pen colour
const INNER   = 0.30; // size of the innermost ring (0–1)
const DENSITY = 0.22; // fraction of crossings that get a star
const GAP_MIN = 20;   // minimum gap between grid lines (px)
const GAP_MAX = 45;   // maximum gap between grid lines (px)
const PENS = [
  [242, 194,  48],   
  [240, 123,  43],   
  [217,  54,  47],  
  [106,  61, 154],   
  [ 30, 159, 203],  
];

let stars = [];

function setup() {
  createCanvas(600, 848);  // A3 proportions (297 × 420 mm)
  noLoop();                // draw once; mousePressed redraws
  makeStars();
}

function mousePressed() {
  makeStars();
  redraw();
}

function keyPressed() {
  if (key === 's' || key === 'S') saveSVG();
}


function makeStars() {
  stars = [];

  // uneven column and row positions
  let xs = [], ys = [];
  for (let x = 50; x < width  - 50; x += random(GAP_MIN, GAP_MAX)) xs.push(x);
  for (let y = 50; y < height - 50; y += random(GAP_MIN, GAP_MAX)) ys.push(y);

  for (let xi = 0; xi < xs.length; xi++) {
    for (let yi = 0; yi < ys.length; yi++) {
      if (random() > DENSITY) continue;          // most grids crossings are empty
//rNDOM PICKS A NUMBER FROM 0 TO 1
      let cx = xs[xi], cy = ys[yi];
      let size = random() < 0.15
        ? random(90, 190)   // occasional large star
        : random(30, 90);   // usual small star

      // arm lengths — min() stops arms running off the canvas
      stars.push({
        x:     cx,
        y:     cy,
        right: min(size * random(0.5, 1.4), width  - 15 - cx),//puri width m se hum cx tuk jitni space usko minus kren r phr 15 r just for safety
        left:  min(size * random(0.5, 1.4), cx - 15),
        up:    min(size * random(0.5, 1.4), cy - 15),
        down:  min(size * random(0.5, 1.4), height - 15 - cy),
      });
    }
  }
}

function starPoints(s, sz) {
  let pts = [];
  let steps = 200; // how many dots you want to draw on star outline
  for (let i = 0; i < steps; i++) {
    let a  = (i / steps) * TWO_PI;//to get small jumps when moving around a circle
    //cos(a) → left/right. Positive = facing right. Negative = facing left.
    //At each step, cos(a) and sin(a) say which direction you are facing on the circle. They are always between −1 and +1.
    let c  = cos(a);
    let sn = sin(a);
    let rx = (c  > 0) ? s.right : s.left;  // right half uses right arm, left uses left
    let ry = (sn > 0) ? s.down  : s.up;    // bottom half uses down arm, top uses up
    let px = s.x + rx * sz * (c  >= 0 ? 1 : -1) * pow(abs(c),  PINCH);//s.x stars own position from centre, the stars edge length, the ring size, the direction of point
//c>0?1:-1 With the sign: dots go left AND right → you get a full star
    //sz is the no btw 0 and 1 that shrinks the star
//px = s.x + rx * sz * sign * squeeze
    let py = s.y + ry * sz * (sn >= 0 ? 1 : -1) * pow(abs(sn), PINCH);
    pts.push([px, py]);
  }
  return pts;
}

function ringSize(p, k) {
  let total = PENS.length * COPIES;
  let idx   = p * COPIES + k;                   
  return INNER + (1 - INNER) * (idx / (total - 1));

}

function draw() {
  background(255);
  blendMode(MULTIPLY);  //blendMode(MULTIPLY) — when two colours overlap, they darken each other, just like real ink on paper. Without this, the second colour would just paint over the first.
  noFill();
  strokeWeight(0.9);

  //go through every pen and then draw that star with the pen

  for (let p = 0; p < PENS.length; p++) {
    stroke(PENS[p][0], PENS[p][1], PENS[p][2]);

    for (let si = 0; si < stars.length; si++) {
      // for each star draw copies rings and each ring is slightly diff in size
      for (let k = 0; k < COPIES; k++) {
        // get all dot positions for that ring(200 dots)
        let pts = starPoints(stars[si], ringSize(p, k));

        beginShape();
        for (let i = 0; i < pts.length; i++) {
          vertex(pts[i][0], pts[i][1]);
        }
        endShape(CLOSE);
      }
    }
  }

  blendMode(BLEND); 
}

function saveSVG() {
  let lines = [];
  lines.push(
    '<svg xmlns="http://www.w3.org/2000/svg"'
    + ' xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"'
    + ' width="297mm" height="420mm"'
    + ' viewBox="0 0 ' + width + ' ' + height + '">'
  );

  for (let p = 0; p < PENS.length; p++) {
    let hex = '#' + PENS[p].map(v => v.toString(16).padStart(2, '0')).join('');
    lines.push(
      '<g inkscape:groupmode="layer"'
      + ' inkscape:label="' + (p + 1) + '"'
      + ' fill="none" stroke="' + hex + '" stroke-width="0.8">'
    );

    for (let si = 0; si < stars.length; si++) {
      for (let k = 0; k < COPIES; k++) {
        let pts = starPoints(stars[si], ringSize(p, k));
        let d = 'M';
        for (let i = 0; i < pts.length; i++) {
          d += ' ' + pts[i][0].toFixed(1) + ' ' + pts[i][1].toFixed(1);
          if (i < pts.length - 1) d += ' L';
        }
        d += ' Z';
        lines.push('<path d="' + d + '"/>');
      }
    }

    lines.push('</g>');
  }

  lines.push('</svg>');
  saveStrings(lines, 'ink-stars', 'svg');
}