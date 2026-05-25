// CAPÍTULO 1-3 - Integración de Transformaciones 2D
// Traslación + Escalamiento + Rotación en un solo sketch

// ===== VARIABLES GLOBALES =====
// Posición del objeto
let posX = 300;
let posY = 200;

// Velocidad para movimiento automático
let vx = 2;
let vy = 1.5;

// Escala
let escala = 1;
let escalaDir = 1;

// Rotación
let angulo = 0;
let velAngular = 0.03;

// Control de modo
let modo = 1; // 1: traslación, 2: escalamiento, 3: rotación
let movAuto = true;

// ===== CONFIGURACIÓN INICIAL =====
function setup() {
  createCanvas(800, 500);
  textSize(16);
  textAlign(CENTER);
  rectMode(CENTER);
}

// ===== BUCLE PRINCIPAL =====
function draw() {
  background(240);
  
  // Mostrar instrucciones
  mostrarInstrucciones();
  
  // Actualizar según el modo
  actualizarModo();
  
  // Dibujar el objeto con transformaciones
  dibujarObjeto();
}

// ===== FUNCIÓN PARA MOSTAR INSTRUCCIONES =====
function mostrarInstrucciones() {
  fill(50);
  noStroke();
  rect(10, 10, 250, 120, 5);
  fill(255);
  text(" CONTROLES:", 135, 30);
  text("Tecla 1: Traslación", 135, 50);
  text("Tecla 2: Escalamiento", 135, 70);
  text("Tecla 3: Rotación", 135, 90);
  text("Barra espaciadora: Pausa", 135, 110);
  
  // Mostrar modo actual
  fill(0, 150, 0);
  switch(modo) {
    case 1: text("🔹 MODO: TRASLACIÓN", width/2, 30); break;
    case 2: text("🔹 MODO: ESCALAMIENTO", width/2, 30); break;
    case 3: text("🔹 MODO: ROTACIÓN", width/2, 30); break;
  }
  
  if(!movAuto) {
    fill(255, 0, 0);
    text("⏸ PAUSADO", width/2, 55);
  }
}

// ===== ACTUALIZAR SEGÚN MODO =====
function actualizarModo() {
  if(!movAuto) return;
  
  switch(modo) {
    case 1: // Traslación - Ejemplo 2 (diagonal con rebote)
      traslacionConRebote();
      break;
    case 2: // Escalamiento - Ejemplo 1 (oscilante)
      escalamientoOscilante();
      break;
    case 3: // Rotación - Ejemplo básico
      rotacionContinua();
      break;
  }
}

// ===== FUNCIÓN DE TRASLACIÓN (Ejemplo 2 mejorado con rebote) =====
function traslacionConRebote() {
  // Actualizar posición
  posX += vx;
  posY += vy;
  
  // Detectar colisión con bordes y rebotar
  if (posX < 50 || posX > width - 50) {
    vx *= -1;
    // Añadir un pequeño efecto de rebote visual
    escala = 1.2;
  }
  
  if (posY < 50 || posY > height - 50) {
    vy *= -1;
    escala = 1.2;
  }
  
  // Suavizar el efecto de escala del rebote
  if (escala > 1) {
    escala *= 0.95;
    if (escala < 1) escala = 1;
  }
}

// ===== FUNCIÓN DE ESCALAMIENTO (Ejemplo 1) =====
function escalamientoOscilante() {
  // Escalamiento armónico usando seno
  escala = 1 + 0.5 * sin(frameCount * 0.05);
  
  // La posición se mantiene en el centro
  posX = width/2;
  posY = height/2;
}

// ===== FUNCIÓN DE ROTACIÓN =====
function rotacionContinua() {
  // Rotación uniforme
  angulo += velAngular;
  
  // La posición se mantiene en el centro
  posX = width/2;
  posY = height/2;
}

// ===== DIBUJAR EL OBJETO CON TRANSFORMACIONES =====
function dibujarObjeto() {
  push(); // Guardar estado actual
  
  // Aplicar transformaciones
  translate(posX, posY);
  
  // Aplicar rotación según el modo
  if (modo == 3) {
    rotate(angulo);
  } else {
    // En otros modos, rotación pequeña para dar dinamismo
    rotate(sin(frameCount * 0.02) * 0.1);
  }
  
  // Aplicar escala
  scale(escala);
  
  // DIBUJAR OBJETO COMPUESTO (un robot/personaje)
  // Cuerpo principal
  fill(100, 150, 255);
  stroke(50);
  strokeWeight(2);
  rect(0, 0, 100, 80, 10);
  
  // Cabeza
  fill(255, 200, 150);
  ellipse(0, -50, 50, 50);
  
  // Ojos
  fill(0);
  ellipse(-10, -60, 8, 8);
  ellipse(10, -60, 8, 8);
  
  // Antena
  stroke(255, 0, 0);
  strokeWeight(3);
  line(-5, -75, -15, -90);
  line(5, -75, 15, -90);
  
  // Brazos
  stroke(100, 150, 255);
  strokeWeight(8);
  line(-45, -20, -70, -30);
  line(45, -20, 70, -30);
  
  // Piernas
  line(-30, 40, -50, 70);
  line(30, 40, 50, 70);
  
  // Corazón o detalle en el pecho (cambia de color con rotación)
  if (modo == 3) {
    fill(255, 100, 100);
  } else {
    fill(255, 255, 100);
  }
  noStroke();
  ellipse(0, 10, 15, 15);
  
  pop(); // Restaurar estado
  
  // Mostrar información adicional
  mostrarInfo();
}

// ===== MOSTRAR INFORMACIÓN TÉCNICA =====
function mostrarInfo() {
  fill(50);
  noStroke();
  rect(width-220, 10, 210, 120, 5);
  fill(255);
  text("📊 ESTADO ACTUAL:", width-115, 30);
  
  switch(modo) {
    case 1:
      text("Pos X: " + nf(posX, 0, 1), width-115, 50);
      text("Pos Y: " + nf(posY, 0, 1), width-115, 70);
      text("Vel X: " + vx, width-115, 90);
      text("Vel Y: " + vy, width-115, 110);
      break;
    case 2:
      text("Escala: " + nf(escala, 1, 2), width-115, 50);
      text("s = 1 + 0.5·sen(0.05·t)", width-115, 70);
      text("Mín: 0.5 - Máx: 1.5", width-115, 90);
      break;
    case 3:
      text("Ángulo: " + nf(angulo, 1, 2) + " rad", width-115, 50);
      text("Grados: " + nf(degrees(angulo), 1, 1) + "°", width-115, 70);
      text("Vel angular: 0.03 rad/frame", width-115, 90);
      break;
  }
}

// ===== INTERACCIÓN CON TECLADO =====
function keyPressed() {
  // Cambiar modo con números
  if (key == '1') {
    modo = 1;
    // Reiniciar posición para traslación
    posX = 300;
    posY = 200;
    vx = 2;
    vy = 1.5;
  }
  else if (key == '2') {
    modo = 2;
  }
  else if (key == '3') {
    modo = 3;
    angulo = 0;
  }
  else if (key == ' ') {
    movAuto = !movAuto; // Pausar/Reanudar
  }
  
  // Control manual cuando está pausado
  if (!movAuto) {
    if (keyCode == LEFT_ARROW) posX -= 5;
    if (keyCode == RIGHT_ARROW) posX += 5;
    if (keyCode == UP_ARROW) posY -= 5;
    if (keyCode == DOWN_ARROW) posY += 5;
    
    // Escala manual con + y -
    if (key == '+') escala += 0.1;
    if (key == '-') escala -= 0.1;
    
    // Rotación manual con [ y ]
    if (key == '[') angulo -= 0.1;
    if (key == ']') angulo += 0.1;
  }
}

// ===== INTERACCIÓN CON MOUSE =====
function mousePressed() {
  // Al hacer clic, cambia la dirección en modo traslación
  if (modo == 1) {
    vx = random(-3, 3);
    vy = random(-3, 3);
  }
}

// ===== INTERACCIÓN CON RUEDA DEL MOUSE =====
function mouseWheel(event) {
  // Control de escala con rueda del mouse
  escala += event.delta * 0.001;
  // Limitar escala
  escala = constrain(escala, 0.2, 3);
}