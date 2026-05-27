/**
 * MÉTODOS NUMÉRICOS - Unidad 1
 * PROYECTO FINAL: Jardín Matemático con Ciclo Día/Noche
 * 
 * 
 * * MÉTODOS NUMÉRICOS - Unidad 1
 * PROYECTO FINAL: Escena Interactiva "Jardín Matemático"
 * 
 * 
 * 
 * Conceptos integrados:
 * ✓ Múltiples figuras geométricas
 * ✓ Animación y tiempo discreto
 * ✓ Interacción con mouse
 * ✓ Color y estilos (RGB, HSB, transparencia)
 * ✓ Control de ciclo (loop/noLoop)
 * ✓ Trigonometría y movimiento circular
 * ✓ Sistemas de coordenadas
 * ✓ Efectos visuales (resplandor, partículas)
 * 
 * Característica especial: El sol se mueve en arco y al completar
 * una vuelta se transforma en luna (y viceversa)
 */

// ============================================================
// VARIABLES GLOBALES
// ============================================================

// Control de animación
let animacionActiva = true;
let velocidad = 1;

// ============================================================
//  CICLO DÍA/NOCHE
// ============================================================
let astro = {
  // Posición en arco
  angulo: 0, // 0 a PI (0° a 180°)
  radio: 300, // Radio del arco
  centroX: 400, // Centro del arco
  centroY: 400, // Centro del arco
  
  // Tipo: true = sol, false = luna
  esSol: true,
  
  // Para la transformación gradual
  transicion: 0, // 0 a 1 (0 = sol, 1 = luna)
  velocidadTransicion: 0.02,
  
  // Colores
  colorDia: [255, 255, 0], // Amarillo sol
  colorNoche: [200, 200, 255], // Blanco azulado luna
};

// Elementos de la escena
let nubes = [];
let estrellas = []; // Estrellas que aparecen de noche
let flores = [];
let mariposa = {
  x: 400,
  y: 200,
  aleteo: 0,
  direccion: 1
};

// Para efecto de partículas
let particulas = [];
let luciernagas = []; // Aparecen de noche

// ============================================================
// CONFIGURACIÓN INICIAL
// ============================================================

function setup() {
  createCanvas(800, 500);
  
  // Configurar modo de color
  colorMode(RGB);
  
  // Crear nubes
  for (let i = 0; i < 3; i++) {
    nubes.push({
      x: random(200, 700),
      y: random(50, 150),
      tamaño: random(60, 100),
      velocidad: random(0.5, 1.5)
    });
  }
  
  // Crear estrellas (para la noche)
  for (let i = 0; i < 50; i++) {
    estrellas.push({
      x: random(width),
      y: random(50, 250),
      tamaño: random(2, 5),
      brillo: random(100, 255),
      parpadeo: random(TWO_PI)
    });
  }
  
  // Crear luciérnagas (para la noche)
  for (let i = 0; i < 8; i++) {
    luciernagas.push({
      x: random(width),
      y: random(250, 450),
      velocidad: random(0.5, 2),
      angulo: random(TWO_PI),
      tamaño: random(3, 6)
    });
  }
  
  // Crear flores
  for (let i = 0; i < 5; i++) {
    flores.push({
      x: random(100, 700),
      y: 400 + random(20, 60),
      tamaño: random(30, 50),
      colorPetalo: [random(200, 255), random(100, 200), random(100, 200)],
      fase: random(TWO_PI) // Para animación
    });
  }
  
  // Crear partículas base
  for (let i = 0; i < 20; i++) {
    particulas.push({
      x: random(width),
      y: random(height),
      tamaño: random(2, 5),
      velocidad: random(1, 3)
    });
  }
  
  textSize(14);
  textAlign(CENTER, CENTER);
}

// ============================================================
// BUCLE PRINCIPAL DE ANIMACIÓN
// ============================================================

function draw() {
  // Actualizar posición del astro (sol/luna)
  actualizarAstro();
  
  // Dibujar fondo según el momento del día
  dibujarFondoConCielo();
  
  // Suelo
  dibujarSuelo();
  
  // Mostrar información de estado
  mostrarInfo();
  
  // ========================================================
  // 🌞🌙 ASTRO (SOL O LUNA) con animación
  // ========================================================
  push();
  
  // Calcular posición en el arco
  let astroX = astro.centroX + astro.radio * cos(astro.angulo);
  let astroY = astro.centroY - astro.radio * sin(astro.angulo); // Restar para que suba
  
  // Efecto de resplandor según el tipo
  if (astro.esSol) {
    // Resplandor solar (amarillo/anaranjado)
    for (let i = 3; i > 0; i--) {
      fill(255, 200, 0, 40 - i * 10);
      noStroke();
      circle(astroX, astroY, 120 + i * 20);
    }
  } else {
    // Resplandor lunar (azul plateado)
    for (let i = 3; i > 0; i--) {
      fill(200, 200, 255, 30 - i * 8);
      noStroke();
      circle(astroX, astroY, 100 + i * 15);
    }
  }
  
  // Dibujar el astro principal
  stroke(255, 255, 255, 100);
  strokeWeight(2);
  
  if (astro.esSol) {
    // Sol: amarillo con rayos
    fill(255, 255, 0);
    circle(astroX, astroY, 80);
    
    // Rayos de sol animados
    stroke(255, 255, 0, 150);
    strokeWeight(1);
    for (let i = 0; i < 8; i++) {
      let anguloRayo = frameCount * 0.02 + i * PI/4;
      let dx = cos(anguloRayo) * 50;
      let dy = sin(anguloRayo) * 50;
      line(astroX, astroY, astroX + dx, astroY + dy);
    }
  } else {
    // Luna: gris azulado con cráteres
    fill(220, 220, 255);
    circle(astroX, astroY, 70);
    
    // Cráteres
    fill(200, 200, 240);
    noStroke();
    circle(astroX - 15, astroY - 10, 15);
    circle(astroX + 10, astroY + 5, 10);
    circle(astroX + 5, astroY - 15, 8);
    
    // Fase lunar (media luna simulada)
    if (astro.transicion > 0.3 && astro.transicion < 0.7) {
      fill(50, 50, 80, 150);
      circle(astroX + 10, astroY, 50);
    }
  }
  pop();
  
  // ========================================================
  // ELEMENTOS QUE CAMBIAN SEGÚN DÍA/NOCHE
  // ========================================================
  
  if (astro.esSol) {
    // === DE DÍA ===
    
    // Nubes
    for (let nube of nubes) {
      push();
      if (animacionActiva) {
        nube.x += nube.velocidad * velocidad;
        if (nube.x > width + 100) nube.x = -100;
      }
      
      fill(255, 255, 255, 220);
      noStroke();
      circle(nube.x, nube.y, nube.tamaño);
      circle(nube.x - nube.tamaño/2, nube.y - nube.tamaño/4, nube.tamaño * 0.7);
      circle(nube.x + nube.tamaño/2, nube.y - nube.tamaño/4, nube.tamaño * 0.7);
      pop();
    }
    
    // Mariposa (solo de día)
    dibujarMariposa();
    
  } else {
    // === DE NOCHE ===
    
    // Estrellas titilantes
    for (let estrella of estrellas) {
      let brillo = estrella.brillo + sin(frameCount * 0.05 + estrella.parpadeo) * 50;
      fill(255, 255, 200, brillo);
      noStroke();
      circle(estrella.x, estrella.y, estrella.tamaño);
    }
    
    // Luciérnagas
    for (let luz of luciernagas) {
      if (animacionActiva) {
        luz.angulo += 0.05 * velocidad;
        luz.x += cos(luz.angulo) * luz.velocidad;
        luz.y += sin(luz.angulo) * luz.velocidad;
        
        // Mantener dentro del canvas
        if (luz.x < 0) luz.x = width;
        if (luz.x > width) luz.x = 0;
        if (luz.y < 200) luz.y = 200;
        if (luz.y > 450) luz.y = 450;
      }
      
      // Efecto de luz
      for (let i = 2; i > 0; i--) {
        fill(200, 255, 200, 30 - i * 10);
        noStroke();
        circle(luz.x, luz.y, luz.tamaño * 4 + i * 5);
      }
      
      fill(100, 255, 100);
      circle(luz.x, luz.y, luz.tamaño);
    }
  }
  
  // ========================================================
  // FLORES (siempre presentes)
  // ========================================================
  for (let i = 0; i < flores.length; i++) {
    let flor = flores[i];
    
    push();
    // Tallo
    stroke(34, 139, 34);
    strokeWeight(4);
    line(flor.x, flor.y, flor.x, flor.y - 80);
    
    // Hojas
    strokeWeight(2);
    line(flor.x, flor.y - 40, flor.x - 20, flor.y - 30);
    line(flor.x, flor.y - 40, flor.x + 20, flor.y - 30);
    
    // Pétalos con animación
    let balanceo = animacionActiva ? sin(frameCount * 0.02 + flor.fase) * 5 : 0;
    
    // Centro de la flor (cambia ligeramente de noche)
    if (astro.esSol) {
      fill(255, 215, 0); // Dorado de día
    } else {
      fill(200, 180, 100); // Más apagado de noche
    }
    noStroke();
    circle(flor.x + balanceo * 0.5, flor.y - 80, 20);
    
    // Pétalos
    for (let j = 0; j < 6; j++) {
      let angulo = j * PI/3 + (animacionActiva ? flor.fase * 0.1 : 0);
      let petaloX = flor.x + cos(angulo) * 25 + balanceo;
      let petaloY = flor.y - 80 + sin(angulo) * 25;
      
      // Color de pétalos más apagado de noche
      let opacidad = astro.esSol ? 200 : 150;
      fill(flor.colorPetalo[0], flor.colorPetalo[1], flor.colorPetalo[2], opacidad);
      circle(petaloX, petaloY, 15);
    }
    pop();
  }
  
  // ========================================================
  // CASA (siempre presente)
  // ========================================================
  push();
  // Base
  fill(astro.esSol ? 200 : 150, 150, 100);
  stroke(100, 50, 0);
  strokeWeight(2);
  rect(100, 320, 120, 100);
  
  // Techo
  fill(astro.esSol ? 150 : 100, 50, 50);
  triangle(80, 320, 160, 260, 240, 320);
  
  // Puerta
  fill(100, 50, 20);
  rect(145, 360, 30, 60);
  
  // Ventana (con luz si es de noche)
  if (!astro.esSol) {
    fill(255, 255, 150); // Luz encendida
  } else {
    fill(173, 216, 230); // Azul de día
  }
  circle(190, 350, 25);
  stroke(0);
  line(190, 338, 190, 362);
  line(178, 350, 202, 350);
  pop();
  
  // ========================================================
  // PARTÍCULAS (rocío de día, niebla de noche)
  // ========================================================
  push();
  for (let p of particulas) {
    if (astro.esSol) {
      // Rocío (brillante)
      fill(255, 255, 255, 200);
    } else {
      // Niebla (azul tenue)
      fill(200, 200, 255, 100);
    }
    noStroke();
    circle(p.x, p.y, p.tamaño);
    
    if (animacionActiva) {
      if (astro.esSol) {
        p.y -= p.velocidad * 0.2 * velocidad; // Rocío sube
        if (p.y < 0) {
          p.y = height;
          p.x = random(width);
        }
      } else {
        // Niebla se mueve lenta
        p.x += p.velocidad * 0.1 * velocidad;
        if (p.x > width) p.x = 0;
      }
    }
  }
  pop();
}

// ============================================================
// FUNCIÓN PARA ACTUALIZAR EL ASTRO (SOL/LUNA)
// ============================================================

function actualizarAstro() {
  if (animacionActiva) {
    // Mover el astro en el arco (de izquierda a derecha)
    astro.angulo += 0.005 * velocidad;
    
    // Cuando completa media vuelta (ángulo = PI)
    if (astro.angulo >= PI) {
      astro.angulo = 0; // Reiniciar ciclo
      
      // CAMBIAR DE SOL A LUNA O VICEVERSA
      astro.esSol = !astro.esSol;
      
      console.log("🌞🌙 Cambio a: " + (astro.esSol ? "SOL" : "LUNA"));
    }
    
    // Actualizar transición gradual (para efectos visuales)
    if (astro.esSol) {
      astro.transicion = max(0, astro.transicion - astro.velocidadTransicion);
    } else {
      astro.transicion = min(1, astro.transicion + astro.velocidadTransicion);
    }
  }
}

// ============================================================
// FUNCIÓN PARA DIBUJAR EL CIELO CON GRADIENTE SEGÚN HORA
// ============================================================

function dibujarFondoConCielo() {
  // Color del cielo basado en la posición del astro y día/noche
  for (let i = 0; i < height/2; i++) {
    let y = i;
    
    if (astro.esSol) {
      // CIELO DE DÍA: azul variable
      let azul = map(y, 0, height/2, 200, 150);
      let rojo = map(y, 0, height/2, 135, 100);
      
      // Efecto de atardecer/amanecer cerca de los bordes
      if (astro.angulo < 0.2 || astro.angulo > PI - 0.2) {
        rojo += 50;
        verde = map(y, 0, height/2, 206, 100);
      } else {
        verde = map(y, 0, height/2, 206, 100);
      }
      
      stroke(rojo, verde, azul, 50);
    } else {
      // CIELO DE NOCHE: azul oscuro a negro
      let azul = map(y, 0, height/2, 100, 20);
      let rojo = map(y, 0, height/2, 50, 10);
      stroke(rojo, 20, azul, 80);
    }
    
    line(0, y, width, y);
  }
}

// ============================================================
// FUNCIÓN PARA DIBUJAR MARIPOSA
// ============================================================

function dibujarMariposa() {
  push();
  // La mariposa sigue al mouse suavemente
  if (animacionActiva) {
    mariposa.x = lerp(mariposa.x, mouseX, 0.05);
    mariposa.y = lerp(mariposa.y, mouseY, 0.05);
    mariposa.aleteo = (mariposa.aleteo + 0.3) % TWO_PI;
  }
  
  // Cuerpo
  fill(100, 50, 50);
  noStroke();
  ellipse(mariposa.x, mariposa.y, 10, 30);
  
  // Alas con efecto de aleteo
  let aleteoAmplitud = sin(mariposa.aleteo) * 10;
  
  fill(255, 200, 255, 200);
  stroke(200, 100, 200);
  strokeWeight(1);
  
  // Ala izquierda
  ellipse(mariposa.x - 15 - aleteoAmplitud, mariposa.y - 5, 25, 20);
  // Ala derecha
  ellipse(mariposa.x + 15 + aleteoAmplitud, mariposa.y - 5, 25, 20);
  
  // Ojos
  fill(0);
  circle(mariposa.x - 3, mariposa.y - 8, 2);
  circle(mariposa.x + 3, mariposa.y - 8, 2);
  pop();
}

// ============================================================
// FUNCIÓN PARA DIBUJAR SUELO
// ============================================================

function dibujarSuelo() {
  // Suelo con gradiente (más oscuro de noche)
  for (let i = height/2; i < height; i++) {
    let verde;
    if (astro.esSol) {
      verde = map(i, height/2, height, 150, 50);
    } else {
      verde = map(i, height/2, height, 80, 20);
    }
    stroke(34, verde, 34, 30);
    line(0, i, width, i);
  }
  
  // Detalles del suelo
  stroke(0, 100, 0, astro.esSol ? 100 : 50);
  strokeWeight(1);
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = height - random(20);
    line(x, y, x + random(-5, 5), y - random(5, 15));
  }
}

// ============================================================
// FUNCIÓN PARA MOSTRAR INFORMACIÓN
// ============================================================

function mostrarInfo() {
  // Panel de información
  fill(255, 255, 255, 200);
  stroke(0);
  strokeWeight(1);
  rect(10, 10, 220, 150, 5);
  
  fill(0);
  noStroke();
  textAlign(LEFT);
  text("🐞 PROYECTO FINAL", 20, 25);
  text("📏 Mouse: (" + mouseX + ", " + mouseY + ")", 20, 45);
  text("⏱ Frame: " + frameCount, 20, 65);
  text("⚡ Vel: " + velocidad + "x", 20, 85);
  
  // Indicador día/noche
  let estado = astro.esSol ? "☀️ DÍA" : "🌙 NOCHE";
  fill(astro.esSol ? 255 : 100, astro.esSol ? 200 : 100, 0);
  text(estado, 20, 105);
  
  // Leyenda de controles
  fill(100);
  textSize(10);
  text("[ESPACIO] Pausa", 20, 125);
  text("[+/-] Velocidad | Click crea flor", 20, 140);
  textAlign(CENTER);
  textSize(14);
}

// ============================================================
// INTERACCIÓN Y CONTROL DEL CICLO
// ============================================================

function keyPressed() {
  // ESPACIO: Pausar/Reanudar animación
  if (key === ' ') {
    animacionActiva = !animacionActiva;
    if (animacionActiva) {
      loop();
    } else {
      noLoop();
    }
  }
  
  // +: Aumentar velocidad
  if (key === '+' || key === '=') {
    velocidad = min(velocidad + 0.25, 3);
  }
  
  // -: Disminuir velocidad
  if (key === '-' || key === '_') {
    velocidad = max(velocidad - 0.25, 0.25);
  }
  
  // N: Forzar cambio día/noche
  if (key === 'n' || key === 'N') {
    astro.esSol = !astro.esSol;
    console.log("🌞🌙 Cambio manual a: " + (astro.esSol ? "SOL" : "LUNA"));
  }
}

function mousePressed() {
  // Al hacer clic, crear una flor nueva
  if (mouseY < height - 50) {
    flores.push({
      x: mouseX,
      y: min(mouseY + 50, height - 30),
      tamaño: random(30, 50),
      colorPetalo: [random(200, 255), random(100, 200), random(100, 200)],
      fase: random(TWO_PI)
    });
  }
}

function mouseWheel(event) {
  // Cambiar velocidad del ciclo con la rueda
  velocidad += event.delta * 0.001;
  velocidad = constrain(velocidad, 0.25, 3);
}

