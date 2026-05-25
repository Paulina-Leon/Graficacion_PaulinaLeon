function setup() {
createCanvas(800, 500, WEBGL);
}
function draw() {
background(240);
orbitControl();
// Cubo
push();
translate(-200, 0, 0);
rotateY(frameCount * 0.02);
fill(255, 100, 100);
box(80);
pop();
// Esfera
push();
translate(0, 0, 0);
fill(100, 200, 255);
sphere(60);
pop();
// Cono
push();
translate(200, 0, 0);
rotateX(frameCount * 0.02);
fill(200, 255, 100);
cone(50, 120);
pop();
}