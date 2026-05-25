function setup() {
createCanvas(800, 500, WEBGL);
}
function draw() {
background(250);
orbitControl();
// Cubo
push();
translate(-200, 0, 0);
box(80);
pop();
// Esfera
push();
translate(0, 0, 0);
scale(1.5);
sphere(50);
pop();
// Toro
push();
translate(200, 0, 0);
rotateY(frameCount * 0.02);
torus(50, 15);
pop();
}