function setup() {
createCanvas(700, 500, WEBGL);
}
function draw() {
background(250);
orbitControl();
stroke(0);
noFill();
rotateY(frameCount * 0.01);
let s = 80;
let v = [[-s,-s,-s],[s,-s,-s],[s,s,-s],[-s,s,-s],
[-s,-s,s],[s,-s,s],[s,s,s],[-s,s,s]
];
let e = [
[0,1],[1,2],[2,3],[3,0],
[4,5],[5,6],[6,7],[7,4],
[0,4],[1,5],[2,6],[3,7]
];
for (let i of e) {
let a = v[i[0]];
let b = v[i[1]];
line(a[0], a[1], a[2], b[0], b[1], b[2]);
}
}