let frames = []; 
function setup() { 
createCanvas(800, 500); 
} 
function draw() { 
background(20); 
let x = 400 + cos(frameCount * 0.03) * 250; 
let y = 250 + sin(frameCount * 0.05) * 120; 
frames.push({x, y}); 
if (frames.length > 25) { 
frames.shift();
} 
for (let i = 0; i < frames.length; i++) { 
let alpha = map(i, 0, frames.length, 10, 255); 
fill(100, 200, 255, alpha); 
noStroke(); 
circle(frames[i].x, 
frames[i].y, 
50); 
} 
} 