// Variables de control de transformaciones
let rotX = 0;
let rotY = 0;
let escala = 1;
let posX = 0;

// Nuevas variables: objeto principal y color
let tipoObjeto = 'cubo';   // 'cubo', 'esfera', 'cilindro', 'cono'
let colorObjeto;          // guardará el color actual (formato p5.js)

function setup() {
  createCanvas(800, 500, WEBGL);
  // Color inicial del objeto principal (rojo)
  colorObjeto = color(255, 100, 100);
}

function draw() {
  background(240);
  orbitControl(); // cámara con el mouse

  // --- OBJETO PRINCIPAL (controlado por todas las teclas) ---
  push();
    translate(posX, 0, 0);        // traslación lateral (A/D)
    rotateX(rotX);                // rotación manual en X (flechas ↑↓)
    rotateY(rotY + frameCount * 0.01); // rotación manual + automática
    scale(escala);                // escala (Q/E)

    fill(colorObjeto);           // color dinámico
    noStroke();                  // sin borde para mejor visualización

    // Dibujar la figura según la tecla numérica pulsada
    if (tipoObjeto === 'cubo') {
      box(100);
    } else if (tipoObjeto === 'esfera') {
      sphere(70);
    } else if (tipoObjeto === 'cilindro') {
      cylinder(60, 130);
    } else if (tipoObjeto === 'cono') {
      cone(70, 150);
    }
  pop();

  // --- Figuras secundarias fijas (decorativas, colores fijos) ---
  push();
    translate(230, 0, 0);
    fill(100, 200, 255);
    sphere(50);
  pop();

  push();
    translate(-230, 0, 0);
    fill(200, 255, 100);
    box(55);
  pop();
}

// --- CONTROLES DE TECLADO ---
function keyPressed() {
  // Movimiento lateral
  if (key === 'A') posX -= 20;
  if (key === 'D') posX += 20;

  // Escala
  if (key === 'Q') escala += 0.1;
  if (key === 'E') escala -= 0.1;

  // Rotación manual
  if (keyCode === UP_ARROW) rotX -= 0.1;
  if (keyCode === DOWN_ARROW) rotX += 0.1;
  if (keyCode === LEFT_ARROW) rotY -= 0.1;
  if (keyCode === RIGHT_ARROW) rotY += 0.1;

  // *** NUEVO: Cambiar el tipo de objeto (teclas 1-4) ***
  if (key === '1') {
    tipoObjeto = 'cubo';
  } else if (key === '2') {
    tipoObjeto = 'esfera';
  } else if (key === '3') {
    tipoObjeto = 'cilindro';
  } else if (key === '4') {
    tipoObjeto = 'cono';
  }

  // *** NUEVO: Cambiar color del objeto principal ***
  // Usamos mayúsculas; si se quiere minúsculas también se pueden agregar
  if (key === 'R') {
    colorObjeto = color(255, 0, 0);        // rojo
  } else if (key === 'G') {
    colorObjeto = color(0, 255, 0);        // verde
  } else if (key === 'B') {
    colorObjeto = color(0, 100, 255);      // azul
  } else if (key === 'Y') {
    colorObjeto = color(255, 255, 0);      // amarillo
  } else if (key === 'W') {
    colorObjeto = color(255);              // blanco
  } else if (key === 'P') {
    colorObjeto = color(180, 0, 255);      // púrpura
  }
}