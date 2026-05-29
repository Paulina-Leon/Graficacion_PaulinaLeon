let moverLuz = true; 
let boids = []; 
function setup() { 
createCanvas(1200, 700, WEBGL); 
for(let i=0;i<80;i++){ 
boids.push({ 
x: random(width), 
y: random(height), 
vx: random(-1,1), 
vy: random(-1,1) 
}); } 
} 
function draw() { 
background(180,0,255)
orbitControl(); // control de cámara
ambientLight(50); // iluminación 
directionalLight( 
255,255,255, 
1,1,-1 
); 
for(let b of boids){ 
b.x += b.vx; 
b.y += b.vy; 
if(b.x<0) b.x=width; 
if(b.x>width) b.x=0; 
if(b.y<0) b.y=height; 
if(b.y>height) b.y=0; 
fill(100,255,200); 
circle(b.x,b.y,6); 
} 
if(moverLuz){ // luz dinámica 
pointLight( 
      255,220,220, 
      mouseX - width/2, 
      mouseY - height/2, 
      300 
    ); 
  } 
  else { 
    pointLight( 
      255,220,220, 
      0,-200,300 
    ); 
  } 
  push(); // piso 
  rotateX(HALF_PI); 
  ambientMaterial(255,255,0); 
  plane(1200,1200); 
  pop(); 
  push(); // esfera animada 
  let x = sin(frameCount * 0.02) * 300; 
    translate(x,0,0); 
  specularMaterial(255); 
  shininess(100); 
  ambientMaterial(255,0,255);
  sphere(90);
  pop(); 
// cubo rotando 
// escala
let s = 1 + 0.5* sin(frameCount * 0.05);
push();
rotate (frameCount* 0.03);
scale(s);
fill(100, 200, 255);
push(); 
translate(-250,-100,-200); 
rotateX(frameCount * 0.01); 
rotateY(frameCount * 0.02); 
ambientMaterial(0,0,255);
box(150); 
pop(); 
// toroide 
push(); 
translate(250,120,150); 
rotateZ(frameCount * 0.03); 
normalMaterial(); 
torus(100,25); 
pop(); 
// cono 
push(); 
translate(0,-180,0); 
rotateY(frameCount * 0.02);
ambientMaterial(255,165,0); // naranja
cone(80,180); 
pop(); 
// texto 
push(); 
resetMatrix(); 
fill(255); 
textSize(20); 
text( 
"ESCENA 3D INTERACTIVA", 
20, 
30 
); 
text( 
"Presiona L para cambiar luz", 
20, 
60 
); 
pop(); 
}
function keyPressed(){ 
if(key === 'L' || key === 'l'){ 
moverLuz = !moverLuz;
} 
} 