function setup() {
createCanvas(700, 500, WEBGL);
}
function draw() {
background(245);
orbitControl();
// Eje X
stroke(255, 0, 0);
line(0, 0, 0, 200, 0, 0);
// Eje Y
stroke(0, 255, 0);
line(0, 0, 0, 0, 200, 0);
// Eje Z
stroke(0, 0, 255);
line(0, 0, 0, 0, 0, 200);
// Punto de referencia
noStroke();
fill(150);
sphere(8);
}