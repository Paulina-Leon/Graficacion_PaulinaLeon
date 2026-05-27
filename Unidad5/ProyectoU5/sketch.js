/*
 * PROYECTO INTEGRADOR - UNIDAD 2
 * Escena 2D Interactiva: Transformaciones + Curvas + Fractal + Texto
 * Autor: cesar emir lizarraga felix
 * Fecha: 2026
 * 
 * 
 */

// ============================================
// VARIABLES GLOBALES
// ============================================

// Transformaciones del objeto principal
let pos = { x: 600, y: 350 };
let escala = 1.0;
let angulo = 0.0;
let shearValor = 0.0;

// Control de arrastre
let arrastrando = false;
let offsetX, offsetY;

// Puntos de control para curva Bézier
let bezierPuntos = [
  { x: 200, y: 500 },  // P0 - inicio
  { x: 350, y: 300 },  // P1 - control 1
  { x: 500, y: 300 },  // P2 - control 2
  { x: 650, y: 500 }   // P3 - final
];
let puntoSeleccionado = -1;

// Parámetros del fractal
let fractalProfundidad = 5;
let fractalAngulo = 30; // grados
let fractalFactor = 60; // porcentaje
let fractalVisible = true;

// Control de modo
let modoInteraccion = "objeto"; // "objeto", "curva", "fractal"

// Posición del fractal (esquina superior derecha)
let fractalPos = { x: 950, y: 200 };

// Sliders - los moveremos a la parte inferior
let sliderEscala, sliderRotacion, sliderShear;
let sliderProfundidad, sliderAnguloFractal, sliderFactorFractal;

// ============================================
// CONFIGURACIÓN INICIAL
// ============================================
function setup() {
  createCanvas(1300, 750);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  
  // Crear sliders en la PARTE INFERIOR
  crearSliders();
}

function crearSliders() {
  let sliderY = 680;
  let spacing = 180;
  
  // Sliders para transformaciones del objeto
  textSize(12);
  
  sliderEscala = createSlider(0.2, 2.5, 1.0, 0.1);
  sliderEscala.position(100, sliderY);
  sliderEscala.style('width', '150px');
  
  sliderRotacion = createSlider(0, 360, 0, 1);
  sliderRotacion.position(300, sliderY);
  sliderRotacion.style('width', '150px');
  
  sliderShear = createSlider(-1.0, 1.0, 0.0, 0.1);
  sliderShear.position(500, sliderY);
  sliderShear.style('width', '150px');
  
  // Sliders para fractal
  sliderProfundidad = createSlider(1, 8, 5, 1);
  sliderProfundidad.position(700, sliderY);
  sliderProfundidad.style('width', '150px');
  
  sliderAnguloFractal = createSlider(0, 90, 30, 1);
  sliderAnguloFractal.position(900, sliderY);
  sliderAnguloFractal.style('width', '150px');
  
  sliderFactorFractal = createSlider(30, 80, 60, 5);
  sliderFactorFractal.position(1100, sliderY);
  sliderFactorFractal.style('width', '150px');
}

// ============================================
// BUCLE PRINCIPAL
// ============================================
function draw() {
  // Fondo más claro
  background(250, 250, 255);
  
  // Actualizar valores desde sliders
  actualizarDesdeSliders();
  
  // Dibujar separadores de áreas
  dibujarAreas();
  
  // ===== 1. DIBUJAR CURVA BÉZIER (parte inferior izquierda) =====
  dibujarCurvaBezier();
  
  // ===== 2. DIBUJAR FRACTAL (parte superior derecha) =====
  if (fractalVisible) {
    dibujarFractal();
  }
  
  // ===== 3. DIBUJAR OBJETO PRINCIPAL (centro) =====
  dibujarObjetoPrincipal();
  
  // ===== 4. DIBUJAR TEXTO =====
  dibujarTexto();
  
  // ===== 5. DIBUJAR CONTROLES =====
  dibujarControles();
}

// ============================================
// DIBUJAR ÁREAS DE TRABAJO
// ============================================
function dibujarAreas() {
  stroke(200);
  strokeWeight(1);
  noFill();
  
  // Área del objeto (centro)
  rect(600, 350, 400, 300);
  
  // Área de la curva (inferior)
  rect(400, 550, 500, 150);
  
  // Área del fractal (superior derecha)
  rect(950, 200, 300, 200);
  
  // Etiquetas de área
  fill(100);
  noStroke();
  textSize(12);
  text(" ÁREA DEL OBJETO", 600, 200);
  text(" ÁREA DE LA CURVA BÉZIER", 400, 480);
  text(" ÁREA DEL FRACTAL", 950, 100);
}

// ============================================
// ACTUALIZACIÓN DE VALORES
// ============================================
function actualizarDesdeSliders() {
  // Transformaciones del objeto
  escala = sliderEscala.value();
  angulo = radians(sliderRotacion.value());
  shearValor = sliderShear.value();
  
  // Parámetros del fractal
  fractalProfundidad = sliderProfundidad.value();
  fractalAngulo = sliderAnguloFractal.value();
  fractalFactor = sliderFactorFractal.value() / 100;
}

// ============================================
// 1. CURVA BÉZIER CON PUNTOS DE CONTROL MÓVILES
// ============================================
function dibujarCurvaBezier() {
  push();
  
  // Dibujar líneas guía
  stroke(150, 150, 150, 150);
  strokeWeight(1);
  line(bezierPuntos[0].x, bezierPuntos[0].y, bezierPuntos[1].x, bezierPuntos[1].y);
  line(bezierPuntos[1].x, bezierPuntos[1].y, bezierPuntos[2].x, bezierPuntos[2].y);
  line(bezierPuntos[2].x, bezierPuntos[2].y, bezierPuntos[3].x, bezierPuntos[3].y);
  
  // Dibujar curva Bézier
  stroke(0, 100, 255);
  strokeWeight(4);
  noFill();
  bezier(
    bezierPuntos[0].x, bezierPuntos[0].y,
    bezierPuntos[1].x, bezierPuntos[1].y,
    bezierPuntos[2].x, bezierPuntos[2].y,
    bezierPuntos[3].x, bezierPuntos[3].y
  );
  
  // Dibujar puntos de control
  for (let i = 0; i < bezierPuntos.length; i++) {
    // Color según tipo de punto
    if (i == 0 || i == 3) {
      fill(255, 0, 0);  // Puntos extremos (rojo)
    } else {
      fill(0, 255, 0);  // Puntos de control (verde)
    }
    
    stroke(0);
    strokeWeight(1);
    circle(bezierPuntos[i].x, bezierPuntos[i].y, 15);
    
    // Etiqueta
    fill(0);
    noStroke();
    text("P" + i, bezierPuntos[i].x + 20, bezierPuntos[i].y - 10);
  }
  
  // Resaltar punto seleccionado
  if (puntoSeleccionado >= 0) {
    stroke(255, 255, 0);
    strokeWeight(3);
    noFill();
    circle(bezierPuntos[puntoSeleccionado].x, bezierPuntos[puntoSeleccionado].y, 25);
  }
  
  pop();
}

// ============================================
// 2. FRACTAL (ÁRBOL RECURSIVO)
// ============================================
function dibujarFractal() {
  push();
  translate(fractalPos.x, fractalPos.y);
  
  // Dibujar tronco base
  stroke(101, 67, 33);
  strokeWeight(4);
  line(0, 0, 0, -40);
  
  translate(0, -40);
  dibujarRama(35, 0, fractalProfundidad);
  pop();
}

function dibujarRama(longitud, anguloActual, nivel) {
  if (nivel <= 0 || longitud < 2) return;
  
  // Aplicar rotación
  rotate(radians(anguloActual));
  
  // Color según nivel (verde más oscuro en niveles profundos)
  let verde = map(nivel, 0, fractalProfundidad, 150, 50);
  stroke(34, verde, 34);
  strokeWeight(map(longitud, 2, 35, 1, 3));
  
  // Dibujar rama
  line(0, 0, 0, -longitud);
  
  // Mover al final de la rama
  translate(0, -longitud);
  
  // Crear ramas hijas
  push();
  dibujarRama(longitud * fractalFactor, fractalAngulo, nivel - 1);
  pop();
  
  push();
  dibujarRama(longitud * fractalFactor, -fractalAngulo, nivel - 1);
  pop();
  
  // Rama central adicional para más densidad
  if (nivel > 2) {
    push();
    dibujarRama(longitud * fractalFactor * 0.7, 0, nivel - 1);
    pop();
  }
}

// ============================================
// 3. OBJETO PRINCIPAL (ROBOT) CON TRANSFORMACIONES
// ============================================
function dibujarObjetoPrincipal() {
  push();
  
  // Aplicar transformaciones
  translate(pos.x, pos.y);
  rotate(angulo);
  scale(escala);
  
  // Aplicar shear
  if (shearValor != 0) {
    shearX(shearValor);
  }
  
  // DIBUJAR ROBOT
  // Cuerpo principal
  fill(70, 130, 200); // Azul más visible
  stroke(30);
  strokeWeight(2);
  rect(0, 0, 80, 100, 10);
  
  // Cabeza
  fill(255, 220, 180);
  ellipse(0, -60, 50, 50);
  
  // Ojos
  fill(0);
  ellipse(-12, -70, 8, 8);
  ellipse(12, -70, 8, 8);
  
  // Antenas
  stroke(255, 50, 50);
  strokeWeight(3);
  line(-10, -85, -20, -100);
  line(10, -85, 20, -100);
  
  // Brazos
  stroke(70, 130, 200);
  strokeWeight(8);
  line(-35, -20, -60, -30);
  line(35, -20, 60, -30);
  
  // Piernas
  line(-25, 50, -40, 80);
  line(25, 50, 40, 80);
  
  // Corazón/Detalle
  fill(255, 80, 80);
  noStroke();
  ellipse(0, 15, 15, 15);
  
  pop();
  
  // Dibujar punto de pivote
  stroke(255, 0, 0);
  strokeWeight(8);
  point(pos.x, pos.y);
}

// ============================================
// 4. TEXTO 2D
// ============================================
function dibujarTexto() {
  // Título del proyecto (arriba)
  push();
  translate(650, 40);
  textSize(28);
  fill(40, 40, 80);
  stroke(255, 200, 200);
  strokeWeight(1);
  text(" PROYECTO INTEGRADOR - GRAFICACIÓN 2D", 0, 0);
  pop();
  
  // Instrucciones (abajo)
  push();
  translate(650, 720);
  textSize(14);
  fill(60);
  stroke(255);
  strokeWeight(0.5);
  text(" Arrastra el ROBOT para moverlo | 🔵 Arrastra puntos VERDES de la curva | 🌳 Sliders abajo", 0, 0);
  text(" Teclas 1-2-3: cambiar modo | R: reiniciar robot | C: reiniciar curva", 0, 20);
  pop();
  
  // Nombre del autor
  push();
  translate(1200, 720);
  textSize(16);
  fill(100, 0, 100);
  text(" cesar emir lizarraga felix - 16/03/2026", 0, 0);
  pop();
  
  // Texto rotado decorativo
  push();
  translate(150, 200);
  rotate(frameCount * 0.01);
  fill(255, 150, 0, 150);
  textSize(20);
  text("⚡ ROTACIÓN ⚡", 0, 0);
  pop();
  
  // Indicador de modo
  push();
  translate(150, 300);
  fill(0);
  textSize(16);
  
  if (modoInteraccion == "objeto") fill(255, 0, 0);
  else fill(150);
  text("MODO: OBJETO (1)", 0, 0);
  
  translate(0, 25);
  if (modoInteraccion == "curva") fill(0, 255, 0);
  else fill(150);
  text("MODO: CURVA (2)", 0, 0);
  
  translate(0, 25);
  if (modoInteraccion == "fractal") fill(0, 0, 255);
  else fill(150);
  text("MODO: FRACTAL (3)", 0, 0);
  pop();
}

// ============================================
// 5. CONTROLES (SLIDERS)
// ============================================
function dibujarControles() {
  // Fondo para sliders
  fill(240, 240, 240, 200);
  noStroke();
  rect(650, 660, 1200, 60);
  
  // Etiquetas de sliders
  fill(0);
  textSize(11);
  text("ESCALA", 170, 665);
  text("ROTACIÓN", 370, 665);
  text("SHEAR", 570, 665);
  text("PROF.", 770, 665);
  text("ÁNGULO", 970, 665);
  text("FACTOR", 1170, 665);
  
  // Valores actuales
  fill(50);
  textSize(10);
  text(escala.toFixed(2), 170, 700);
  text(sliderRotacion.value() + "°", 370, 700);
  text(shearValor.toFixed(2), 570, 700);
  text(fractalProfundidad, 770, 700);
  text(fractalAngulo + "°", 970, 700);
  text((fractalFactor*100).toFixed(0) + "%", 1170, 700);
}

// ============================================
// INTERACCIÓN CON MOUSE
// ============================================
function mousePressed() {
  let d;
  
  if (modoInteraccion == "objeto") {
    // Arrastrar objeto
    d = dist(mouseX, mouseY, pos.x, pos.y);
    if (d < 50) {
      arrastrando = true;
      offsetX = pos.x - mouseX;
      offsetY = pos.y - mouseY;
    }
  }
  else if (modoInteraccion == "curva") {
    // Seleccionar punto de curva
    for (let i = 0; i < bezierPuntos.length; i++) {
      d = dist(mouseX, mouseY, bezierPuntos[i].x, bezierPuntos[i].y);
      if (d < 20) {
        puntoSeleccionado = i;
        break;
      }
    }
  }
}

function mouseDragged() {
  if (modoInteraccion == "objeto" && arrastrando) {
    pos.x = mouseX + offsetX;
    pos.y = mouseY + offsetY;
  }
  else if (modoInteraccion == "curva" && puntoSeleccionado >= 0) {
    bezierPuntos[puntoSeleccionado].x = mouseX;
    bezierPuntos[puntoSeleccionado].y = mouseY;
  }
}

function mouseReleased() {
  arrastrando = false;
  puntoSeleccionado = -1;
}

function mouseWheel(event) {
  if (modoInteraccion == "objeto") {
    // Control de escala con rueda
    escala += event.delta * -0.001;
    escala = constrain(escala, 0.2, 2.5);
    sliderEscala.value(escala);
  }
  else if (modoInteraccion == "fractal") {
    // Control de profundidad con rueda
    fractalProfundidad += (event.delta > 0 ? -1 : 1);
    fractalProfundidad = constrain(fractalProfundidad, 1, 8);
    sliderProfundidad.value(fractalProfundidad);
  }
}

// ============================================
// INTERACCIÓN CON TECLADO
// ============================================
function keyPressed() {
  // Cambiar modo de interacción
  if (key == '1') modoInteraccion = "objeto";
  if (key == '2') modoInteraccion = "curva";
  if (key == '3') modoInteraccion = "fractal";
  
  // Control de movimiento con teclas (modo objeto)
  if (modoInteraccion == "objeto") {
    if (keyCode == LEFT_ARROW) pos.x -= 10;
    if (keyCode == RIGHT_ARROW) pos.x += 10;
    if (keyCode == UP_ARROW) pos.y -= 10;
    if (keyCode == DOWN_ARROW) pos.y += 10;
  }
  
  // Control de parámetros del fractal (modo fractal)
  if (modoInteraccion == "fractal") {
    if (key == '+') fractalProfundidad = min(fractalProfundidad + 1, 8);
    if (key == '-') fractalProfundidad = max(fractalProfundidad - 1, 1);
    sliderProfundidad.value(fractalProfundidad);
  }
  
  // Reiniciar posición del robot
  if (key == 'r' || key == 'R') {
    pos.x = 600;
    pos.y = 350;
    escala = 1.0;
    angulo = 0;
    shearValor = 0;
    sliderEscala.value(1.0);
    sliderRotacion.value(0);
    sliderShear.value(0);
  }
  
  // Reiniciar curva
  if (key == 'c' || key == 'C') {
    bezierPuntos = [
      { x: 200, y: 500 },
      { x: 350, y: 300 },
      { x: 500, y: 300 },
      { x: 650, y: 500 }
    ];
  }
}