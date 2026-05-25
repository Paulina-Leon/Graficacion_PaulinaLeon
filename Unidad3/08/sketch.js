function setup() {
createCanvas(700, 500, WEBGL);
}
function draw() {
background(250);
orbitControl();
// Simulación eje arbitrario
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.015);
box(100);
}