let luzSigueMouse = true;
let colorFondo = 20;
let modoCono = 0;

let angCono = 0;

function setup() {
  createCanvas(800, 600, WEBGL);
  setAttributes('antialias', true);
}

function draw() {
  orbitControl();
  background(colorFondo);

  ambientLight(60);
  directionalLight(255, 255, 255, 1, 1, -1);

  // Luz puntual
  if (luzSigueMouse) {
    let luzX = mouseX - width / 2;
    let luzY = mouseY - height / 2;
    pointLight(255, 220, 200, luzX, luzY, 200);
  } else {
    pointLight(255, 220, 200, 0, -150, 250);
  }

  // =========================
  // 🔺 CONO AZUL BAJITO
  // =========================
  push();

  rotateY(angCono);
  rotateX(angCono * 0.6);

  // 🔵 azul pastel
  let azul = [173, 216, 230];

  if (modoCono === 0) {
    specularMaterial(azul[0], azul[1], azul[2]);
    shininess(80);
  } 
  else if (modoCono === 1) {
    ambientMaterial(azul[0], azul[1], azul[2]);
  } 
  else {
    fill(azul[0], azul[1], azul[2]);
  }

  cone(90, 150);

  pop();

  angCono += 0.01;

  // =========================
  // TEXTO UI
  // =========================
  push();
  resetMatrix();
  camera();

  fill(255);
  noStroke();
  textSize(16);

  text("🔺 CONO 3D AZUL BAJITO", 20, 30);
  textSize(12);

  text("Mouse: orbitar cámara", 20, 55);
  text("L: luz sigue al mouse = " + (luzSigueMouse ? "ACTIVA" : "FIJA"), 20, 75);
  text("C: cambiar fondo", 20, 95);
  text("M: cambiar material del cono", 20, 115);

  pop();
}

function keyPressed() {

  if (key === 'L' || key === 'l') {
    luzSigueMouse = !luzSigueMouse;
  }

  if (key === 'C' || key === 'c') {
    if (colorFondo === 20) colorFondo = 10;
    else if (colorFondo === 10) colorFondo = 30;
    else if (colorFondo === 30) colorFondo = 15;
    else colorFondo = 20;
  }

  if (key === 'M' || key === 'm') {
    modoCono = (modoCono + 1) % 3;
  }
}