let x = 0;
let y = 0;
let velocidad = 5;
function setup() {
    createCanvas(400, 200);}
function draw() {
    background(220);
    frameRate(30);
    circle(x, 100, 40);
    circle(200, y, 40);
    x += velocidad;
    if (x > 400 || x < 0) {
      if (y > height || y < 0){
        velocidad = -velocidad; }
    }
}