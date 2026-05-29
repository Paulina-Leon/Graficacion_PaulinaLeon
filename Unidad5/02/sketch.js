// ============================================================
// PROYECTO INTEGRADOR - UNIDAD 5
// "CATCH THE RAINBOW CUBES"
// ============================================================
// Autor: Estudiante
// Descripción: Juego interactivo donde el jugador controla una nave
// que debe atrapar cubos de colores que caen. Incluye:
// - Animación continua (caída, interpolación, partículas)
// - Interacción teclado/mouse
// - Múltiples objetos (nave, cubos, partículas)
// - Efectos visuales (trails, cambio de color, partículas)
// - Interpolación (lerp para suavizado y movimiento)
// ============================================================

// Variables del juego
let naveX, naveY;
let anchoNave = 60;
let altoNave = 40;
let objetos = [];      // Cubos que caen
let particulas = [];   // Efectos visuales
let puntuacion = 0;
let vidas = 3;
let juegoActivo = true;

// Variables para interpolación (movimiento suave)
let naveXSuave = 0;
let targetX = 0;

// Colores dinámicos
let colorFondo;

// Efecto de ghost frames (onion skinning)
let historialPosiciones = [];

function setup() {
  createCanvas(800, 600);
  naveY = height - 70;
  naveXSuave = width / 2;
  targetX = width / 2;
  naveX = width / 2;
  
  // Texto inicial
  textAlign(CENTER, CENTER);
  textSize(20);
  
  // Generar objetos cada cierto tiempo
  setInterval(() => {
    if (juegoActivo) {
      objetos.push(new ObjetoCaida());
    }
  }, 800);
}

function draw() {
  // --- 1. ANIMACIÓN Y EFECTOS VISUALES (Background con transparencia para trails) ---
  // Fondo con opacidad baja para crear efecto de estela (trail)
  background(0, 0, 0, 30);
  
  // Cambio de color dinámico según puntuación (interpolación de color)
  let r = lerp(0, 255, puntuacion / 20);
  let g = lerp(0, 128, sin(frameCount * 0.02) * 0.5 + 0.5);
  let b = lerp(100, 255, 1 - (puntuacion / 30));
  colorFondo = color(r, g, b);
  
  // --- 2. INTERPOLACIÓN DE MOVIMIENTO (suavizado de la nave) ---
  // Usando lerp para mover la nave suavemente hacia el mouse
  if (juegoActivo) {
    targetX = constrain(mouseX, 40, width - 40);
    naveXSuave = lerp(naveXSuave, targetX, 0.1);
    naveX = naveXSuave;
  }
  
  // --- 3. ONION SKINNING / TRAILS de la nave (ghost frames) ---
  historialPosiciones.push({ x: naveX, y: naveY });
  if (historialPosiciones.length > 10) {
    historialPosiciones.shift();
  }
  for (let i = 0; i < historialPosiciones.length; i++) {
    let alpha = map(i, 0, historialPosiciones.length, 30, 150);
    fill(255, 255, 100, alpha);
    noStroke();
    ellipse(historialPosiciones[i].x, historialPosiciones[i].y, anchoNave * 0.8, altoNave * 0.8);
  }
  
  // --- 4. DIBUJAR NAVES (objeto principal) ---
  // Efecto de "respiración" con escala
  let escala = 1 + sin(frameCount * 0.1) * 0.05;
  push();
  translate(naveX, naveY);
  scale(escala);
  fill(100, 200, 255);
  stroke(255);
  strokeWeight(2);
  ellipse(0, 0, anchoNave, altoNave);
  fill(255, 100, 100);
  triangle(-15, -10, 0, -25, 15, -10);
  fill(255);
  ellipse(-15, 0, 10, 15);
  ellipse(15, 0, 10, 15);
  fill(0);
  ellipse(-15, 0, 5, 8);
  ellipse(15, 0, 5, 8);
  pop();
  
  // --- 5. ACTUALIZAR Y DIBUJAR OBJETOS CAÍDA (múltiples objetos) ---
  for (let i = objetos.length - 1; i >= 0; i--) {
    let obj = objetos[i];
    obj.actualizar();
    obj.mostrar();
    
    // Colisión con la nave (distancia interpolada)
    let distancia = dist(naveX, naveY, obj.x, obj.y);
    if (distancia < anchoNave / 2 + obj.tamano / 2) {
      objetos.splice(i, 1);
      puntuacion++;
      
      // Crear partículas al atrapar (efecto visual)
      for (let j = 0; j < 10; j++) {
        particulas.push(new Particula(obj.x, obj.y, obj.color));
      }
      
      // Interpolación de sonido visual: cambiar color de fondo momentáneo
      // (simulado con un flash blanco)
      fill(255, 100);
      rect(0, 0, width, height);
    }
    // Si el objeto llega al fondo, perder vida
    else if (obj.y > height + 30) {
      objetos.splice(i, 1);
      vidas--;
      if (vidas <= 0) {
        juegoActivo = false;
      }
    }
  }
  
  // --- 6. SISTEMA DE PARTÍCULAS (efectos visuales) ---
  for (let i = particulas.length - 1; i >= 0; i--) {
    particulas[i].actualizar();
    particulas[i].mostrar();
    if (particulas[i].vida <= 0) {
      particulas.splice(i, 1);
    }
  }
  
  // --- 7. MOSTRAR INTERFAZ (texto, puntuación, vidas) ---
  fill(255);
  noStroke();
  textSize(24);
  text("✨ Puntos: " + puntuacion, width / 2, 50);
  textSize(20);
  text("💖 Vidas: " + vidas, width / 2, 90);
  
  if (!juegoActivo) {
    textSize(40);
    fill(255, 0, 0);
    text("GAME OVER", width / 2, height / 2);
    textSize(20);
    fill(255);
    text("Presiona 'R' para reiniciar", width / 2, height / 2 + 50);
  } else {
    textSize(14);
    fill(200);
    text("Mueve el mouse | Atrapa los cubos 🎨", width / 2, height - 20);
  }
  
  // Mostrar FPS (opcional)
  fill(255, 150);
  textSize(12);
  text("FPS: " + floor(frameRate()), width - 60, 20);
}

// ============================================================
// CLASE OBJETO QUE CAE (con interpolación de tamaño y color)
// ============================================================
class ObjetoCaida {
  constructor() {
    this.x = random(50, width - 50);
    this.y = -30;
    this.tamano = random(20, 50);
    this.velocidad = random(2, 6);
    // Color con interpolación aleatoria
    this.color = color(
      random(100, 255),
      random(100, 255),
      random(100, 255)
    );
    this.rotacion = 0;
    this.tipo = floor(random(2)); // 0 = cuadrado, 1 = círculo
  }
  
  actualizar() {
    this.y += this.velocidad;
    this.rotacion += 0.05;
    // Interpolación de tamaño que oscila (efecto visual)
    this.tamano = lerp(this.tamano, this.tamano + sin(frameCount * 0.02) * 2, 0.05);
  }
  
  mostrar() {
    push();
    translate(this.x, this.y);
    rotate(this.rotacion);
    fill(this.color);
    stroke(255);
    strokeWeight(2);
    if (this.tipo === 0) {
      rectMode(CENTER);
      rect(0, 0, this.tamano, this.tamano);
    } else {
      circle(0, 0, this.tamano);
    }
    pop();
  }
}

// ============================================================
// CLASE PARTÍCULA (efecto visual al atrapar)
// ============================================================
class Particula {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3);
    this.vy = random(-5, -1);
    this.vida = 255;
    this.color = col;
    this.tamano = random(5, 12);
  }
  
  actualizar() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2; // gravedad
    this.vida -= 5;
  }
  
  mostrar() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.vida);
    circle(this.x, this.y, this.tamano);
  }
}

// ============================================================
// INTERACCIÓN CON TECLADO (reinicio)
// ============================================================
function keyPressed() {
  if (key === 'r' || key === 'R') {
    reiniciarJuego();
  }
}

function reiniciarJuego() {
  juegoActivo = true;
  puntuacion = 0;
  vidas = 3;
  objetos = [];
  particulas = [];
  historialPosiciones = [];
  naveXSuave = width / 2;
  targetX = width / 2;
  naveX = width / 2;
}

// ============================================================
// INTERACCIÓN CON MOUSE (control adicional)
// ============================================================
function mousePressed() {
  // Si el juego no está activo, también se puede reiniciar con clic en botón imaginario
  if (!juegoActivo && mouseX > width/2 - 50 && mouseX < width/2 + 50 && mouseY > height/2 + 40 && mouseY < height/2 + 80) {
    reiniciarJuego();
  }
}

// ============================================================
// NOTA: Para mejor experiencia, ejecutar en p5.js Web Editor o local
// ============================================================