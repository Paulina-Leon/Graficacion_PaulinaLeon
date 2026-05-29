let moverLuz = true; 
function setup() { 
createCanvas(1200, 700, WEBGL); 
} 
function draw() { 
background(15); 
// control de cámara 
orbitControl(); 
// iluminación 
ambientLight(40); 
directionalLight( 
255,255,255, 
1,1,-1 
); 
// luz dinámica 
if(moverLuz){ 
pointLight( 
 255,220,220, 
      mouseX - width/2, 
      mouseY - height/2, 
      300 
    ); 
 
  } else { 
 
    pointLight( 
      255,220,220, 
      0,-200,300 
    ); 
  } 
 
  // piso 
  push(); 
 
  rotateX(HALF_PI); 
 
  ambientMaterial(80); 
 
  plane(1200,1200); 
 
  pop(); 
 
  // esfera animada 
  push(); 
 
  let x = sin(frameCount * 0.02) * 300; 
    translate(x,0,0); 
 
  specularMaterial(255); 
 
  shininess(100); 
 
  sphere(90);
  pop(); 
// cubo rotando 
push(); 
translate(-250,-100,-200); 
rotateX(frameCount * 0.01); 
rotateY(frameCount * 0.02); 
ambientMaterial(200,80,80); 
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
ambientMaterial(100,200,255); 
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