function setup() { 
createCanvas(800, 500); 
} 
function draw() { 
background(20); 
translate(400,250); 
// cuerpo 
stroke(255);
strokeWeight(10); 
line(0,-100,0,100); 
// brazos 
push(); 
translate(0,-50); 
rotate(sin(frameCount*0.05)*0.5); 
line(0,0,-80,0); 
pop(); 
push(); 
translate(0,-50); 
rotate(-sin(frameCount*0.05)*0.5); 
line(0,0,80,0); 
pop(); 
} 
