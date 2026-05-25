/*// DESAFÍO 1 - Escalamiento con pivote personalizado (punto de clic)

let escala = 1.0;
let pivoteX = 300;
let pivoteY = 200;

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  textSize(16);
}

function draw() {
  background(240);
  
  // Escala oscilante automática
  escala = 1 + 0.5 * sin(frameCount * 0.05);
  
  // Dibujar punto pivote (donde se hizo clic)
  fill(255, 0, 0);
  noStroke();
  circle(pivoteX, pivoteY, 10);
  stroke(0);
  
  // Aplicar transformaciones
  push();
  translate(pivoteX, pivoteY);  // Mover al pivote
  scale(escala);                 // Escalar desde el pivote
  
  // Dibujar objeto (centrado en el pivote)
  fill(100, 150, 255, 200);
  stroke(50);
  strokeWeight(2);
  rect(0, 0, 100, 60);
  
  fill(255, 200, 100);
  circle(0, 0, 30);
  pop();
  
  // Información
  fill(0);
  text("Pivote: (" + pivoteX + ", " + pivoteY + ")", 20, 30);
  text("Escala: " + nf(escala, 1, 2), 20, 50);
  text("Haz clic para cambiar el punto pivote", 20, 80);
}

// Guardar posición del clic como nuevo pivote
function mousePressed() {
  pivoteX = mouseX;
  pivoteY = mouseY;
}

*/ 












/*
// DESAFÍO 2 - Pulsación controlada (amplitud y frecuencia variables)

let amplitud = 0.5;    // A: qué tanto crece/encoge
let frecuencia = 0.05; // ω: qué tan rápido late

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  textSize(16);
}

function draw() {
  background(240);
  
  // Fórmula de pulsación
  let t = frameCount;
  let escala = 1 + amplitud * sin(frecuencia * t);
  
  // Dibujar objeto en el centro
  push();
  translate(width/2, height/2);
  scale(escala);
  
  fill(100, 150, 255);
  stroke(50);
  strokeWeight(2);
  rect(0, 0, 120, 80, 10);
  
  fill(255, 100, 100);
  circle(0, 0, 40);
  pop();
  
  // Mostrar información
  fill(0);
  text("FÓRMULA: s = 1 + " + nf(amplitud, 1, 2) + "·sen(" + nf(frecuencia, 1, 3) + "·t)", 20, 30);
  text("Escala actual: " + nf(escala, 1, 2), 20, 50);
  text("Rango: [" + nf(1 - amplitud, 1, 2) + ", " + nf(1 + amplitud, 1, 2) + "]", 20, 70);
  
  // Controles
  text("CONTROLES:", 20, 120);
  text("A / Shift+A : Cambiar amplitud", 20, 140);
  text("F / Shift+F : Cambiar frecuencia", 20, 160);
  text("R : Reiniciar", 20, 180);
}

function keyPressed() {
  // Control de amplitud (A)
  if (key == 'a' || key == 'A') {
    if (keyIsPressed && keyCode == SHIFT) {
      amplitud += 0.1;  // Shift+A = aumentar
    } else {
      amplitud -= 0.1;  // A = disminuir
    }
  }
  
  // Control de frecuencia (F)
  if (key == 'f' || key == 'F') {
    if (keyIsPressed && keyCode == SHIFT) {
      frecuencia += 0.01;  // Shift+F = aumentar
    } else {
      frecuencia -= 0.01;  // F = disminuir
    }
  }
  
  // Reiniciar (R)
  if (key == 'r' || key == 'R') {
    amplitud = 0.5;
    frecuencia = 0.05;
  }
  
  // Limitar valores
  amplitud = constrain(amplitud, 0, 1.5);
  frecuencia = constrain(frecuencia, 0.01, 0.2);
}  
  */








// DESAFÍO 3 - ¿Importa el orden? SRT vs TRS

let escala = 1.5;
let angulo = PI/4;  // 45 grados
let traslacion = 80;

function setup() {
  createCanvas(900, 700);
  rectMode(CENTER);
  textSize(14);
}

function draw() {
  background(240);
  
  // Títulos
  fill(0);
  text("ORDEN A: Traslación → Rotación → Escala (T·R·S)", 150, 40);
  text("ORDEN B: Escala → Rotación → Traslación (S·R·T)", 550, 40);
  
  // Dibujar ejes de referencia
  stroke(200);
  line(200, 50, 200, 350);
  line(50, 200, 350, 200);
  line(600, 50, 600, 350);
  line(450, 200, 750, 200);
  
  // Puntos de origen
  fill(0);
  noStroke();
  circle(200, 200, 5);
  circle(600, 200, 5);
  text("origen", 180, 180);
  text("origen", 580, 180);
  
  // OBJETO 1: TRASLACIÓN → ROTACIÓN → ESCALA (T·R·S)
  push();
  translate(200, 200);     // 1. Trasladar al origen izquierdo
  rotate(angulo);          // 2. Rotar
  scale(escala);           // 3. Escalar
  
  fill(255, 100, 100, 180);
  stroke(100, 0, 0);
  strokeWeight(2);
  rect(0, 0, 100, 60);
  
  // Punto de referencia
  fill(0, 255, 0);
  circle(0, 0, 6);
  pop();
  
  // OBJETO 2: ESCALA → ROTACIÓN → TRASLACIÓN (S·R·T)
  push();
  scale(escala);           // 1. Escalar
  rotate(angulo);          // 2. Rotar
  translate(600, 200);     // 3. Trasladar al origen derecho
  
  fill(100, 255, 100, 180);
  stroke(0, 100, 0);
  strokeWeight(2);
  rect(0, 0, 100, 60);
  
  // Punto de referencia
  fill(0, 255, 0);
  circle(0, 0, 6);
  pop();
  
  // Explicación
  fill(0);
  text("Punto verde = posición del objeto", 20, 370);
  text("OBJETO A (rojo): T(200,200) → R(45°) → S(1.5)", 20, 390);
  text("OBJETO B (verde): S(1.5) → R(45°) → T(600,200)", 20, 410);
  
  // Demostración matemática
  textSize(12);
  fill(100, 0, 0);
  text("SRT ≠ TRS", 300, 350);
  fill(0, 100, 0);
  text("Las matrices NO conmutan", 500, 350);
}