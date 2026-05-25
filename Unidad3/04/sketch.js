let fov = PI/3;
function setup() {
createCanvas(700, 500, WEBGL);
}
function draw() {
background(240);
orbitControl();
perspective(fov, width/height, 0.1, 1000);
push();
translate(0, 0, -200);
box(100);
pop();
}
function keyPressed() {
if (key === 'A') fov -= 0.1;
if (key === 'D') fov += 0.1;
}