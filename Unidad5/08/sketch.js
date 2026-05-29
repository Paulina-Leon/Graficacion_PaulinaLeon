let boids = []; 
function setup(){ 
createCanvas(800,500); 
for(let i=0;i<80;i++){ 
boids.push({ 
x: random(width), 
y: random(height), 
vx: random(-1,1), 
vy: random(-1,1) 
}); 
} 
} 
function draw(){ 
background(30); 
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
}