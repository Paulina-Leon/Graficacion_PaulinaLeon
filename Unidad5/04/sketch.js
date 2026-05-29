function setup() { 
createCanvas(800, 500); 
} 
function draw() { 
background(20); 
translate(width/2, height/2); 
let t = (sin(frameCount * 0.02)+1)/2; 
fill( 
lerp(255, 0, t), 
100, 
lerp(0, 255, t) 
);
beginShape(); 
for (let a = 0; a < TWO_PI; a += PI/12) { 
// círculo 
let cx = cos(a) * 120; 
let cy = sin(a) * 120; 
// estrella 
let r = (a % (PI/3) < PI/6) ? 60 : 140; 
let sx = cos(a) * r; 
let sy = sin(a) * r; 
// morph 
let x = lerp(cx, sx, t); 
let y = lerp(cy, sy, t); 
vertex(x, y); 
} 
endShape(CLOSE); 
}