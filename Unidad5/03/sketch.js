function setup() {
createCanvas (800, 500);
}
function draw() {
background (20);
// movimiento horizontal
let x = (frameCount * 3) % width;
// escala
let s = 1 + 0.5* sin(frameCount * 0.05);
push();
translate(x, 250);
rotate (frameCount* 0.03);
scale(s);
fill(100, 200, 255);
rectMode (CENTER);
rect(0, 0, 100, 100);
pop();
}