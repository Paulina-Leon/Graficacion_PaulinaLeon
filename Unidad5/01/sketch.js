let x = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(30);
  fill(100, 200, 255);
  circle(x, 200, 50);
  
  x += 3;
  
  if (x > width + 25) {
    x = -25;
  }
}
let x = 100;
let velocidad = 4;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(30);
  fill(255, 100, 100);
  circle(x, 200, 50);
  
  x += velocidad;
  
  if (x > width - 25 || x < 25) {
    velocidad *= -1;
  }
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(30);
  
  let t = millis() / 1000;
  let x = width / 2 + sin(t * 2) * 200;
  
  let r = map(sin(t), -1, 1, 100, 255);
  let g = map(cos(t), -1, 1, 50, 200);
  
  fill(r, g, 150);
  circle(x, 200, 60);
}