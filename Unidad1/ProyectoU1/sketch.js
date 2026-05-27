/**
 * LEÓN VÁZQUEZ PAULINA ARACELI
 * PROYECTO FINAL: Jardín 
 * GRAFICACIÓN - Unidad 1
 * PROYECTO FINAL: Escena Interactiva 
 * Conceptos integrados:
 * Figuras geométricas
 * Animación y tiempo discreto
 * Interacción con mouse
 * Color y estilos (RGB, HSB, transparencia)
 * Control de ciclo (loop/noLoop)
 * Trigonometría y movimiento circular
 * Sistemas de coordenadas
 * Efectos visuales (resplandor, partículas)
 * 
 * Característica especial: El sol se mueve en arco y al completar
 * una vuelta se transforma en luna (y viceversa)
 */
// VARIABLES GLOBALES
// Control de animación
let animacionActiva = true;
let velocidad = 0.5;

let astro = {//  CICLO DÍA/NOCHE
  // Posición en arco
  angulo: 0, // 0 a PI (0° a 180°)
  radio: 300, // Radio del arco
  centroX: 400, // Centro del arco
  centroY: 400, // Centro del arco
  esSol: true,// Tipo: true = sol, false = luna
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
let corazones = [];
let mariposa = {
  x: 400,
  y: 200,
  aleteo: 0,
  direccion: 1
};
let particulas = [];// Para efecto de partículas
let luciernagas = []; // Aparecen de noche

function setup() {// CONFIGURACIÓN INICIAL
  createCanvas(800, 500);
  colorMode(RGB);// Configurar modo de color
  for (let i = 0; i < 3; i++) {// Crear nubes
    nubes.push({
      x: random(200, 700),
      y: random(50, 150),
      tamaño: random(60, 100),
      velocidad: random(0.5, 0.5)
    }); }
  for (let i = 0; i < 50; i++) {// Crear estrellas (para la noche)
    estrellas.push({
      x: random(width),
      y: random(50, 250),
      tamaño: random(2, 5),
      brillo: random(100, 255),
      parpadeo: random(TWO_PI)
    }); }
  for (let i = 0; i < 8; i++) {// Crear luciérnagas (para la noche)
    luciernagas.push({
      x: random(width),
      y: random(250, 450),
      velocidad: random(0.5, 2),
      angulo: random(TWO_PI),
      tamaño: random(3, 6)
    }); }
  for (let i = 0; i < 20; i++) {// Crear partículas base
    particulas.push({
      x: random(width),
      y: random(height),
      tamaño: random(2, 5),
      velocidad: random(1, 3)
    }); }
  textSize(14);
  textAlign(CENTER, CENTER);
}
function draw() {// BUCLE PRINCIPAL DE ANIMACIÓN
  actualizarAstro();// Actualizar posición del astro (sol/luna)
  dibujarFondoConCielo();// Dibujar fondo según el momento del día
  dibujarSuelo();// Suelo
  mostrarInfo();// Mostrar información de estado

  push();// 🌞🌙 ASTRO (SOL O LUNA) con animación
  let astroX = astro.centroX + astro.radio * cos(astro.angulo);// Calcular posición en el arco
  let astroY = astro.centroY - astro.radio * sin(astro.angulo); // Restar para que suba
  if (astro.esSol) {// Efecto de resplandor según el tipo
    for (let i = 3; i > 0; i--) {// Resplandor solar (amarillo/anaranjado)
      fill(255, 200, 0, 40 - i * 10);
      noStroke();
      circle(astroX, astroY, 120 + i * 20); }
  } 
  else {
    for (let i = 3; i > 0; i--) {// Resplandor lunar (azul plateado)
      fill(200, 200, 255, 30 - i * 8);
      noStroke();
      circle(astroX, astroY, 100 + i * 15); }
  }
  stroke(255, 255, 255, 100);// Dibujar el astro principal
  strokeWeight(2);
  
  if (astro.esSol) {
    fill(255, 255, 0);// Sol: amarillo con rayos
    circle(astroX, astroY, 80);
    stroke(255, 255, 0, 150);// Rayos de sol animados
    strokeWeight(1);
    for (let i = 0; i < 8; i++) {
      let anguloRayo = frameCount * 0.02 + i * PI/4;
      let dx = cos(anguloRayo) * 50;
      let dy = sin(anguloRayo) * 50;
      line(astroX, astroY, astroX + dx, astroY + dy); }
  } 
  else {
    fill(220, 220, 255);// Luna: gris azulado con cráteres
    circle(astroX, astroY, 70);
    fill(200, 200, 240);// Cráteres
    noStroke();
    circle(astroX - 15, astroY - 10, 15);
    circle(astroX + 10, astroY + 5, 10);
    circle(astroX + 5, astroY - 15, 8);
    if (astro.transicion > 0.3 && astro.transicion < 0.7) {// Fase lunar (media luna simulada)
      fill(50, 50, 80, 150);
      circle(astroX + 10, astroY, 50); }
  }
  pop();
for (let i = 0; i < corazones.length; i++) {// CORAZONES (EFECTO CLICK)
  let c = corazones[i];
  c.y -= c.velocidad;
  c.alpha -= 3;
  push();
  fill(255, 80, 150, c.alpha);
  noStroke();  
  circle(c.x - 3, c.y, 6);// corazón pequeño hecho con círculos y triángulo
  circle(c.x + 3, c.y, 6);
  triangle(
    c.x - 6, c.y,
    c.x + 6, c.y,
    c.x, c.y + 8
  );

  pop();
}
corazones = corazones.filter(c => c.alpha > 0);// eliminar corazones viejos

  if (astro.esSol) {// ELEMENTOS QUE CAMBIAN SEGÚN DÍA/NOCHE
    // === DE DÍA ===
    for (let nube of nubes) {// Nubes
      push();
      if (animacionActiva) {
        nube.x += nube.velocidad * velocidad;
        if (nube.x > width + 100) nube.x = -100; }
      fill(255, 255, 255, 230);
noStroke();
ellipse(nube.x, nube.y, nube.tamaño + 40, nube.tamaño * 0.6);// base de la nube
ellipse(nube.x - 30, nube.y - 10, nube.tamaño * 0.7, nube.tamaño * 0.7);// partes superiores
ellipse(nube.x, nube.y - 20, nube.tamaño * 0.9, nube.tamaño * 0.8);
ellipse(nube.x + 35, nube.y - 10, nube.tamaño * 0.7, nube.tamaño * 0.7);
fill(220, 220, 220, 80);// sombra
ellipse(nube.x, nube.y + 10, nube.tamaño + 30, nube.tamaño * 0.3);
    }
    dibujarMariposa(); } // Mariposa (solo de día)
  else {
    // === DE NOCHE ===
    // Estrellas titilantes
    for (let estrella of estrellas) {
      let brillo = estrella.brillo + sin(frameCount * 0.05 + estrella.parpadeo) * 50;
      fill(255, 255, 200, brillo);
      noStroke();
      circle(estrella.x, estrella.y, estrella.tamaño); }
    for (let luz of luciernagas) {// Luciérnagas
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
      for (let i = 2; i > 0; i--) {// Efecto de luz
        fill(200, 255, 200, 30 - i * 10);
        noStroke();
        circle(luz.x, luz.y, luz.tamaño * 4 + i * 5); }
      fill(100, 255, 100);
      circle(luz.x, luz.y, luz.tamaño); }
  }
for (let i = 0; i < width; i += 5) {// PASTO (CÉSPED)
  let altura = random(10, 25);
  if (astro.esSol) {// cambia color según día/noche
    stroke(34, 180, 34, 200);} 
  else {
    stroke(20, 100, 20, 150); }  
  let movimiento = animacionActiva ? sin(frameCount * 0.05 + i) * 3 : 0;// pequeño movimiento si hay animación
  line(i, height - 5, i + movimiento, height - altura);
}
push();// CASA GRANDE Y COLORIDA
// Base de la casa
fill(255, 180, 120); // naranja claro
stroke(120, 70, 40);
strokeWeight(3);
rect(80, 250, 220, 170, 10);
// Techo
fill(220, 60, 60); // rojo
triangle(60, 250, 190, 150, 320, 250);
// Puerta
fill(120, 70, 20); // café
rect(165, 330, 50, 90, 5);
fill(255, 255, 0);// Perilla
circle(205, 375, 8);
// Ventanas
fill(100, 200, 255); // azul cielo
rect(105, 290, 45, 45, 5);
rect(230, 290, 45, 45, 5);
stroke(255);// Líneas ventanas
line(127, 290, 127, 335);
line(105, 312, 150, 312);
line(252, 290, 252, 335);
line(230, 312, 275, 312);
fill(150, 80, 80);// Chimenea
rect(240, 180, 30, 50);
fill(220, 220, 220, 180);// Humo
noStroke();
circle(255, 160, 20);
circle(270, 145, 25);
circle(285, 125, 18);

pop();

  push();
  for (let p of particulas) {// PARTÍCULAS (rocío de día, niebla de noche)
    if (astro.esSol) {// Rocío (brillante)
      fill(255, 255, 255, 200); } 
    else {// Niebla (azul tenue)
      fill(200, 200, 255, 100); }
    noStroke();
    circle(p.x, p.y, p.tamaño);
    if (animacionActiva) {
      if (astro.esSol) {
        p.y -= p.velocidad * 0.2 * velocidad; // Rocío sube
        if (p.y < 0) {
          p.y = height;
          p.x = random(width); }
      } 
      else {
        // Niebla se mueve lenta
        p.x += p.velocidad * 0.1 * velocidad;
        if (p.x > width) p.x = 0; }
    }
  }
  pop();
}
function actualizarAstro() {// FUNCIÓN PARA ACTUALIZAR EL ASTRO (SOL/LUNA)
  if (animacionActiva) {
    astro.angulo += 0.005 * velocidad;// Mover el astro en el arco (de izquierda a derecha)
    if (astro.angulo >= PI) {// Cuando completa media vuelta (ángulo = PI)
      astro.angulo = 0; // Reiniciar ciclo 
      astro.esSol = !astro.esSol;// CAMBIAR DE SOL A LUNA O VICEVERSA
      console.log("🌞🌙 Cambio a: " + (astro.esSol ? "SOL" : "LUNA")); }
    // Actualizar transición gradual (para efectos visuales)
    if (astro.esSol) {
      astro.transicion = max(0, astro.transicion - astro.velocidadTransicion); } 
    else {
      astro.transicion = min(1, astro.transicion + astro.velocidadTransicion); }
  }
}
function dibujarFondoConCielo() {// FUNCIÓN PARA DIBUJAR EL CIELO CON GRADIENTE SEGÚN HORA
  for (let i = 0; i < height/2; i++) {// Color del cielo basado en la posición del astro y día/noche
    let y = i;
    if (astro.esSol) {
      // CIELO DE DÍA: azul variable
      let azul = map(y, 0, height/2, 200, 150);
      let rojo = map(y, 0, height/2, 135, 100);
      if (astro.angulo < 0.2 || astro.angulo > PI - 0.2) {
        rojo += 50;// Efecto de atardecer/amanecer cerca de los bordes
        verde = map(y, 0, height/2, 206, 100); } 
      else {
        verde = map(y, 0, height/2, 206, 100); }
      
      stroke(rojo, verde, azul, 50); } 
    else {// CIELO DE NOCHE: azul oscuro a negro
      let azul = map(y, 0, height/2, 100, 20);
      let rojo = map(y, 0, height/2, 50, 10);
      stroke(rojo, 20, azul, 80); }
    line(0, y, width, y); }
}
function dibujarMariposa() {// FUNCIÓN PARA DIBUJAR MARIPOSA
  push();
  if (animacionActiva) {// seguir al mouse
    mariposa.x = lerp(mariposa.x, mouseX, 0.08);
    mariposa.y = lerp(mariposa.y, mouseY, 0.08);
    mariposa.aleteo = (mariposa.aleteo + 0.25) % TWO_PI; }
  fill(80, 40, 60);// cuerpo
  noStroke();
  ellipse(mariposa.x, mariposa.y, 5, 14);
  let flap = sin(mariposa.aleteo) * 6;// movimiento de alas
  let c1 = color(255, 150, 220);// color 
  let c2 = color(120, 200, 255);
  fill(c1);// alas izquierda
  ellipse(mariposa.x - 8 - flap, mariposa.y - 3, 12, 10);
  fill(c2);
  ellipse(mariposa.x - 6 - flap, mariposa.y + 4, 10, 8);
  fill(c1);// alas derecha
  ellipse(mariposa.x + 8 + flap, mariposa.y - 3, 12, 10);
  fill(c2);
  ellipse(mariposa.x + 6 + flap, mariposa.y + 4, 10, 8);
  fill(0);// cabeza
  circle(mariposa.x, mariposa.y - 8, 2);
  pop();
}
function dibujarSuelo() {// FUNCIÓN PARA DIBUJAR SUELO
  for (let i = height/2; i < height; i++) {
    let verde;
    if (astro.esSol) {
      verde = map(i, height/2, height, 255, 120); // VERDE MÁS VIVO
      stroke(0, verde, 0, 40); } 
    else {
      verde = map(i, height/2, height, 120, 40); // noche más oscuro
      stroke(0, verde, 0, 40); }
    line(0, i, width, i);
  }
  stroke(0, 180, 0, astro.esSol ? 120 : 60);// detalles del suelo
  strokeWeight(1);
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = height - random(20);
    line(x, y, x + random(-5, 5), y - random(5, 15)); }
}
function mostrarInfo() {// FUNCIÓN PARA MOSTRAR INFORMACIÓN
  fill(255, 255, 255, 200);// Panel de información
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
  let estado = astro.esSol ? "☀️ DÍA" : "🌙 NOCHE";// Indicador día/noche
  fill(astro.esSol ? 255 : 100, astro.esSol ? 200 : 100, 0);
  text(estado, 20, 105);
  fill(100);// Leyenda de controles
  textSize(10);
  text("[ESPACIO] Pausa", 20, 125);
  text("[+/-] Velocidad | Click crea flor", 20, 140);
  textAlign(CENTER);
  textSize(14);
}
// INTERACCIÓN Y CONTROL DEL CICLO
function keyPressed() {// ESPACIO: Pausar/Reanudar animación
  if (key === ' ') {
    animacionActiva = !animacionActiva;
    if (animacionActiva) {
      loop(); } 
    else {
      noLoop(); }
  }
  if (key === '+' || key === '=') {// +: Aumentar velocidad
    velocidad = min(velocidad + 0.25, 3); }
  if (key === '-' || key === '_') {// -: Disminuir velocidad
    velocidad = max(velocidad - 0.25, 0.25); }
  if (key === 'n' || key === 'N') {
    astro.esSol = !astro.esSol;// N: Forzar cambio día/noche
    console.log("🌞🌙 Cambio manual a: " + (astro.esSol ? "SOL" : "LUNA"));}
}
function mousePressed() {  
  for (let i = 0; i < 6; i++) {// crear varios corazones al click
    corazones.push({
      x: mouseX + random(-10, 10),
      y: mouseY + random(-10, 10),
      velocidad: random(0.5, 1.5),
      alpha: 255 });
  }
}
function mouseWheel(event) {
  // Cambiar velocidad del ciclo con la rueda
  velocidad += event.delta * 0.001;
  velocidad = constrain(velocidad, 0.25, 3);
}