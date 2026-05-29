let x = 0;
function setup() {
createCanvas (800, 400);
frameRate(60);
}
function draw() {
background(20);
// texto
fill(255);
textSize(20);
text("Animación básica", 20, 30);
// circulo animado
fill(100, 200, 255);
circle(x, 200, 80);
// movimiento
x += 3;
// reinicio
if (x > width + 40) {
x = -40;
}
// FPS
fill(255);
text("FPS: "+ floor (frameRate()), 20, 60);
}