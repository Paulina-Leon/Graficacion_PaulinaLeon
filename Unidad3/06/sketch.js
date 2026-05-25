let angulo = 0;
function setup() {
createCanvas(800, 500, WEBGL);
}
function draw() {
background(240);
let camX = 300 * cos(angulo);
let camZ = 300 * sin(angulo);
camera(camX, 0, camZ, 0, 0, 0, 0, 1, 0);
angulo += 0.01;
box(100);
}