let rotX = 0;
let rotY = 0;
let escala = 1;
let posX = 0;
function setup() {
createCanvas(800, 500, WEBGL);
}
function draw() {
background(240);
orbitControl();
// Objeto principal
push();
translate(posX, 0, 0);
rotateX(rotX);
rotateY(rotY + frameCount * 0.01);
scale(escala);
fill(255, 100, 100);
box(100);
pop();
// Esfera
push();
translate(200, 0, 0);
fill(100, 200, 255);
sphere(60);
pop();
// Cono
push();
translate(-200, 0, 0);
fill(200, 255, 100);
cone(50, 120);
pop();
}
function keyPressed() {
if (key === 'A') posX -= 20;
if (key === 'D') posX += 20;
if (key === 'Q') escala += 0.1;
if (key === 'E') escala -= 0.1;
if (keyCode === UP_ARROW) rotX -= 0.1;
if (keyCode === DOWN_ARROW) rotX += 0.1;
if (keyCode === LEFT_ARROW) rotY -= 0.1;
if (keyCode === RIGHT_ARROW) rotY += 0.1;
}