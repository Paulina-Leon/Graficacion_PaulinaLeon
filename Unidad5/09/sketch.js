let x = 0; 
function setup() { 
createCanvas(900,500); 
}
function draw() { 
background(20); 
// mover automáticamente 
x += 2; 
if(x > width){ 
x = 0; 
} 
// interacción con mouse 
let tamaño = map(mouseX,0,width,50,200); 
// color dinámico 
let r = map(mouseY,0,height,0,255); 
fill(r,100,255); 
push(); 
translate(x,250); 
rotate(frameCount * 0.03); 
rectMode(CENTER); 
rect(0,0,tamaño,tamaño); 
pop(); 
}