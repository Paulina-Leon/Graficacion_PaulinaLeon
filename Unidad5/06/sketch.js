function setup() { 
createCanvas(1000, 600, WEBGL); 
} 
function draw() { 
background(10); 
orbitControl(); 
ambientLight(40); 
pointLight(255,255,255,0,-200,300);
// esfera animada 
push(); 
let x = sin(frameCount * 0.02) * 250; 
translate(x, 0, 0); 
specularMaterial(255); 
sphere(80); 
pop(); 
// cubo rotando 
push(); 
rotateX(frameCount * 0.01); 
rotateY(frameCount * 0.02); 
ambientMaterial(200,80,80); 
box(150); 
pop(); 
// toroide 
push(); 
translate(0,150,-200); 
rotateZ(frameCount * 0.03); 
normalMaterial();
torus(70,20);
pop(); 
} 