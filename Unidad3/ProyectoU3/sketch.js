// ============================================
// PROYECTO: CIUDAD MATEMÁTICA INTERACTIVA
// ============================================

// ================= VARIABLES =================
let pos = { x: 600, y: 350 };
let escala = 1.0;
let angulo = 0.0;
let shearValor = 0.0;

let arrastrando = false;
let offsetX, offsetY;

// Bézier
let puntos = [
  { x: 200, y: 500 },
  { x: 350, y: 300 },
  { x: 500, y: 300 },
  { x: 650, y: 500 }
];
let puntoSel = -1;

// Fractal
let profundidad = 5;
let anguloF = 30;
let factor = 0.65;

// Modo
let modo = "objeto";

// Sliders
let sEscala, sRot, sShear, sProf;

// ================= SETUP =================
function setup() {
  createCanvas(1300, 750);
  rectMode(CENTER);

  crearSliders();
}

function crearSliders() {
  let y = 690;

  sEscala = createSlider(0.2, 2.5, 1, 0.1).position(100, y);
  sRot = createSlider(0, 360, 0, 1).position(300, y);
  sShear = createSlider(-1, 1, 0, 0.1).position(500, y);
  sProf = createSlider(1, 8, 5, 1).position(700, y);
}

// ================= DRAW =================
function draw() {
  background(245);

  actualizar();

  dibujarCiudad();
  dibujarBezier();
  dibujarFractal();
  dibujarRobot();
  dibujarUI();
}

// ================= ACTUALIZAR =================
function actualizar() {
  escala = sEscala.value();
  angulo = radians(sRot.value());
  shearValor = sShear.value();
  profundidad = sProf.value();
}

// ================= CIUDAD =================
function dibujarCiudad() {
  // cielo
  for (let y = 0; y < height / 2; y++) {
    stroke(180, 220, 255 - y * 0.2);
    line(0, y, width, y);
  }

  // edificios
  for (let i = 0; i < 15; i++) {
    let x = i * 90 + 50;
    let h = random(100, 300);

    fill(80, 80, 120);
    rect(x, 600, 60, h);

    // ventanas
    fill(255, 255, 100, 150);
    for (let j = 0; j < 5; j++) {
      rect(x - 15 + j * 10, 600 - j * 30, 5, 10);
    }
  }
}
// ================= FLOR =================
function dibujarRobot() {
  push();

  // Transformaciones
  translate(pos.x, pos.y);
  rotate(angulo);
  scale(escala);

  if (shearValor != 0) {
    shearX(shearValor);
  }

  // ================= TALLO =================
  stroke(34, 139, 34);
  strokeWeight(4);
  line(0, 60, 0, -40);

  // ================= HOJAS =================
  strokeWeight(2);
  fill(60, 180, 75);
  ellipse(-20, 10, 25, 15);
  ellipse(20, 20, 25, 15);

  // ================= CENTRO =================
  fill(255, 200, 0);
  noStroke();
  circle(0, -40, 25);

  // ================= PÉTALOS =================
  let numPetalos = 8;
  for (let i = 0; i < numPetalos; i++) {
    let ang = TWO_PI / numPetalos * i;

    let x = cos(ang) * 25;
    let y = sin(ang) * 25 - 40;

    fill(255, 120, 200);
    stroke(200, 80, 160);
    strokeWeight(1);
    circle(x, y, 18);
  }

  // ================= DETALLE =================
  fill(255, 80, 120);
  noStroke();
  circle(0, -40, 8);

  pop();

  // punto de pivote
  fill(255, 0, 0);
  noStroke();
  circle(pos.x, pos.y, 8);
}
// ================= BÉZIER =================
function dibujarBezier() {
  stroke(0, 120, 255);
  strokeWeight(3);
  noFill();

  bezier(
    puntos[0].x, puntos[0].y,
    puntos[1].x, puntos[1].y,
    puntos[2].x, puntos[2].y,
    puntos[3].x, puntos[3].y
  );

  for (let i = 0; i < puntos.length; i++) {
    fill(i == 0 || i == 3 ? "red" : "green");
    circle(puntos[i].x, puntos[i].y, 12);
  }
}

// ================= FRACTAL =================
function dibujarFractal() {
  push();
  translate(1050, 250);

  stroke(80, 40, 20);
  branch(60, profundidad);
  pop();
}

function branch(len, n) {
  if (n == 0) return;

  strokeWeight(n);
  line(0, 0, 0, -len);
  translate(0, -len);

  push();
  rotate(radians(anguloF));
  branch(len * factor, n - 1);
  pop();

  push();
  rotate(-radians(anguloF));
  branch(len * factor, n - 1);
  pop();
}

// ================= UI =================
function dibujarUI() {
  fill(255);
  rect(650, 700, 1200, 60);

  fill(0);
  text("ESCALA", 100, 680);
  text("ROTACIÓN", 300, 680);
  text("SHEAR", 500, 680);
  text("PROFUNDIDAD", 700, 680);

  text("CIUDAD MATEMÁTICA INTERACTIVA", 650, 30);
}

// ================= MOUSE =================
function mousePressed() {
  if (modo == "objeto") {
    let d = dist(mouseX, mouseY, pos.x, pos.y);
    if (d < 50) {
      arrastrando = true;
      offsetX = pos.x - mouseX;
      offsetY = pos.y - mouseY;
    }
  }
}

function mouseDragged() {
  if (arrastrando) {
    pos.x = mouseX + offsetX;
    pos.y = mouseY + offsetY;
  }
}

function mouseReleased() {
  arrastrando = false;
}

// ================= TECLADO =================
function keyPressed() {
  if (key == '1') modo = "objeto";
  if (key == '2') modo = "curva";
  if (key == '3') modo = "fractal";
}