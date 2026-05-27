/*LEÓN VÁZQUEZ PAULINA ARACELI
 * GRAFICACIÓN - Unidad 2
 * PROYECTO FINAL: Escena 2D Interactiva
 * Transformaciones + Curvas + Fractal + Texto*/
// VARIABLES GLOBALES
// Transformaciones del objeto principal
let pos = { x: 600, y: 350 };
let escala = 1.0;
let angulo = 0.0;
let shearValor = 0.0;
let arrastrando = false;// Control de arrastre
let offsetX, offsetY;
let bezierPuntos = [// Puntos de control para curva Bézier
  { x: 200, y: 500 },  // P0 - inicio
  { x: 350, y: 300 },  // P1 - control 1
  { x: 500, y: 300 },  // P2 - control 2
  { x: 650, y: 500 }   // P3 - final
];
let puntoSeleccionado = -1;
let fractalProfundidad = 5;// Parámetros del fractal
let fractalAngulo = 30; // grados
let fractalFactor = 60; // porcentaje
let fractalVisible = true;
// Control de modo
let modoInteraccion = "objeto"; // "objeto", "curva", "fractal"
let fractalPos = { x: 950, y: 200 };// Posición del fractal (esquina superior derecha)
let sliderEscala, sliderRotacion, sliderShear;// Sliders - los moveremos a la parte inferior
let sliderProfundidad, sliderAnguloFractal, sliderFactorFractal;
function setup() {// CONFIGURACIÓN INICIAL
  createCanvas(1300, 550);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  crearSliders();// Crear sliders en la PARTE INFERIOR
}
function crearSliders() {
  let sliderY = 550;
  let spacing = 100;
  textSize(12);// Sliders para transformaciones del objeto
  sliderEscala = createSlider(0.2, 2.5, 1.0, 0.1);
  sliderEscala.position(100, sliderY);
  sliderEscala.style('width', '150px');
  sliderRotacion = createSlider(0, 360, 0, 1);
  sliderRotacion.position(300, sliderY);
  sliderRotacion.style('width', '150px');
  sliderShear = createSlider(-1.0, 1.0, 0.0, 0.1);
  sliderShear.position(500, sliderY);
  sliderShear.style('width', '150px');
  sliderProfundidad = createSlider(1, 8, 5, 1);// Sliders para fractal
  sliderProfundidad.position(700, sliderY);
  sliderProfundidad.style('width', '150px');
  sliderAnguloFractal = createSlider(0, 90, 30, 1);
  sliderAnguloFractal.position(900, sliderY);
  sliderAnguloFractal.style('width', '150px');
  sliderFactorFractal = createSlider(30, 80, 60, 5);
  sliderFactorFractal.position(1100, sliderY);
  sliderFactorFractal.style('width', '150px');
}
function draw() {// BUCLE PRINCIPAL
  background(250, 225, 235);
  actualizarDesdeSliders();// Actualizar valores desde sliders
  dibujarAreas();// Dibujar separadores de áreas
  dibujarCurvaBezier();//DIBUJAR CURVA BÉZIER (parte inferior izquierda)
  if (fractalVisible) {//DIBUJAR FRACTAL 
  dibujarFractal(); }
  dibujarObjetoPrincipal();//DIBUJAR OBJETO PRINCIPAL
  dibujarTexto();//DIBUJAR TEXTO
  dibujarControles();// CONTROLES
}
function dibujarAreas() {// DIBUJAR ÁREAS DE TRABAJO
  stroke(200);
  strokeWeight(1);
  noFill();
  rect(600, 250, 300, 200);// Área del objeto (centro)
  rect(230, 250, 300, 200);// Área de la curva (inferior)
  rect(1050, 250, 300, 200);// Área del fractal (superior derecha)
  fill(100);// Etiquetas de área
  noStroke();
  textSize(12);
  text(" ÁREA DEL OBJETO", 600, 120);
  text(" ÁREA DE LA CURVA BÉZIER", 230, 120);
  text(" ÁREA DEL FRACTAL", 1050, 120);
}
function actualizarDesdeSliders() {// ACTUALIZACIÓN DE VALORES
  // Transformaciones del objeto
  escala = sliderEscala.value();
  angulo = radians(sliderRotacion.value());
  shearValor = sliderShear.value();
  fractalProfundidad = sliderProfundidad.value();// Parámetros del fractal
  fractalAngulo = sliderAnguloFractal.value();
  fractalFactor = sliderFactorFractal.value() / 100;
}
function dibujarCurvaBezier() {// 1. CURVA BÉZIER CON PUNTOS DE CONTROL MÓVILES
  push();
  translate(-30, 0);
  scale(0.60); //Tamaño
  stroke(150, 150, 150, 150);// Dibujar líneas guía
  strokeWeight(1);
  line(bezierPuntos[0].x, bezierPuntos[0].y, bezierPuntos[1].x, bezierPuntos[1].y);
  line(bezierPuntos[1].x, bezierPuntos[1].y, bezierPuntos[2].x, bezierPuntos[2].y);
  line(bezierPuntos[2].x, bezierPuntos[2].y, bezierPuntos[3].x, bezierPuntos[3].y);
  stroke(0, 100, 255);// Curva Bézier
  strokeWeight(4);
  noFill();
  bezier(
    bezierPuntos[0].x, bezierPuntos[0].y,
    bezierPuntos[1].x, bezierPuntos[1].y,
    bezierPuntos[2].x, bezierPuntos[2].y,
    bezierPuntos[3].x, bezierPuntos[3].y
  );  
  for (let i = 0; i < bezierPuntos.length; i++) {// Puntos de control
    if (i == 0 || i == 3) {
      fill(255, 0, 0); } 
      else {
      fill(0, 255, 0); }
    stroke(0);
    strokeWeight(1);
    circle(bezierPuntos[i].x, bezierPuntos[i].y, 15);
    fill(0);
    noStroke();
    text("P" + i, bezierPuntos[i].x + 20, bezierPuntos[i].y - 10);  } 
  if (puntoSeleccionado >= 0) {// Punto seleccionado
    stroke(255, 255, 0);
    strokeWeight(3);
    noFill();
    circle(bezierPuntos[puntoSeleccionado].x, bezierPuntos[puntoSeleccionado].y, 25); }
  pop();
}
function dibujarFractal() {// 2. FRACTAL (ÁRBOL RECURSIVO)
  push();
  translate(1050, 340);
  stroke(131, 67, 33);//Tronco base
  strokeWeight(4);
  line(0, 0, 0, -40);
  translate(0, -40);
  dibujarRama(45, 0, fractalProfundidad);
  pop();
}
function dibujarRama(longitud, anguloActual, nivel) {
  if (nivel <= 0 || longitud < 2) return;
  rotate(radians(anguloActual));// Aplicar rotación
  let verde = map(nivel, 0, fractalProfundidad, 150, 50);// Color según nivel (verde más oscuro en niveles profundos)
  stroke(34, verde, 34);
  strokeWeight(map(longitud, 2, 35, 1, 3));
  line(0, 0, 0, -longitud);  // Dibujar rama
  translate(0, -longitud);  // Mover al final de la rama
  push();// Crear ramas hijas
  dibujarRama(longitud * fractalFactor, fractalAngulo, nivel - 1);
  pop();
  push();
  dibujarRama(longitud * fractalFactor, -fractalAngulo, nivel - 1);
  pop();
  if (nivel > 2) {// Rama central adicional para más densidad
    push();
    dibujarRama(longitud * fractalFactor * 0.7, 0, nivel - 1);
    pop(); }
}
function dibujarObjetoPrincipal() {//OSITO
  push();
  translate(pos.x, pos.y);// Transformaciones
  rotate(angulo);
  scale(escala);
  if (shearValor != 0) {
    shearX(shearValor); }
  //CUERPO
  fill(180, 140, 100); // café osito
  stroke(80, 50, 30);
  strokeWeight(2);
  ellipse(0, 20, 70, 80); // cuerpo
  fill(200, 160, 120);//CABEZA
  ellipse(0, -40, 70, 70);
  ellipse(-20, -75, 25, 25);// orejas
  ellipse(20, -75, 25, 25);
  fill(230, 190, 150);// interior orejas
  ellipse(-20, -75, 12, 12);
  ellipse(20, -75, 12, 12);
  fill(0);//CARA
  ellipse(-12, -45, 6, 6); // ojo izq
  ellipse(12, -45, 6, 6);  // ojo der
  fill(120, 80, 60);// nariz
  ellipse(0, -30, 10, 8);
  noFill();// boca
  stroke(80, 50, 30);
  strokeWeight(2);
  arc(0, -20, 15, 10, 0, PI);
  fill(160, 120, 90);//PATITAS
  stroke(80, 50, 30);
  strokeWeight(2);
  ellipse(-25, 50, 25, 30); // patas traseras// izquierda
  ellipse(25, 50, 25, 30);  // derecha
  ellipse(-25, 15, 25, 30); // delanteras// pata trasera izquierda
  ellipse(25, 15, 25, 30);  // pata trasera derecha
  pop();
  fill(0, 0, 0);// punto de pivote
  noStroke();
  circle(pos.x, pos.y, 8);
}
function dibujarTexto() {// 4. TEXTO 
  push();// Instrucciones (abajo)
  translate(650, 0);
  textSize(12);
  fill(60);
  stroke(255);
  strokeWeight(0.5);
  text(" Arrastra el osito para moverlo | Arrastra puntos VERDES de la curva | Sliders abajo", 0, 60);
  text(" Teclas 1-2-3: cambia modo | R: reiniciar osito | C: reiniciar curva", 0, 50);
  pop();
  push();// Indicador de modo
  translate(100, 40);
  fill(0);
  textSize(14);
  if (modoInteraccion == "objeto") fill(255, 50, 50);
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
function dibujarControles() {// 5. CONTROLES (SLIDERS)
  fill(190, 230, 255, 200);// Fondo para sliders
  noStroke();
  rect(650, 460, 1300, 60);
  fill(0);  // Etiquetas de sliders
  textSize(11);
  text("ESCALA", 170, 500);
  text("ROTACIÓN", 370, 500);
  text("SHEAR", 570, 500);
  text("PROF.", 770, 500);
  text("ÁNGULO", 970, 500);
  text("FACTOR", 1170, 500);
  fill(50);// Valores actuales
  textSize(10);
  text(escala.toFixed(2), 170, 510);
  text(sliderRotacion.value() + "°", 370, 510);
  text(shearValor.toFixed(2), 570, 510);
  text(fractalProfundidad, 770, 510);
  text(fractalAngulo + "°", 970, 510);
  text((fractalFactor*100).toFixed(0) + "%", 1170, 510);
}
function mousePressed() {// INTERACCIÓN CON MOUSE
  let d; 
  if (modoInteraccion == "objeto") {// Arrastrar objeto
    d = dist(mouseX, mouseY, pos.x, pos.y);
    if (d < 50) {
      arrastrando = true;
      offsetX = pos.x - mouseX;
      offsetY = pos.y - mouseY; }
  }
  else if (modoInteraccion == "curva") {// Seleccionar punto de curva
    for (let i = 0; i < bezierPuntos.length; i++) {
      d = dist(mouseX, mouseY, bezierPuntos[i].x, bezierPuntos[i].y);
      if (d < 20) {
        puntoSeleccionado = i;
        break; }
    }
  }
}
function mouseDragged() {
  if (modoInteraccion == "objeto" && arrastrando) {
    pos.x = mouseX + offsetX;
    pos.y = mouseY + offsetY; }
  else if (modoInteraccion == "curva" && puntoSeleccionado >= 0) {
    bezierPuntos[puntoSeleccionado].x = mouseX;
    bezierPuntos[puntoSeleccionado].y = mouseY; }
}
function mouseReleased() {
  arrastrando = false;
  puntoSeleccionado = -1;}
function mouseWheel(event) {
  if (modoInteraccion == "objeto") { // Control de escala con rueda
    escala += event.delta * -0.001;
    escala = constrain(escala, 0.2, 2.5);
    sliderEscala.value(escala); }
  else if (modoInteraccion == "fractal") {// Control de profundidad con rueda
    fractalProfundidad += (event.delta > 0 ? -1 : 1);
    fractalProfundidad = constrain(fractalProfundidad, 1, 8);
    sliderProfundidad.value(fractalProfundidad); }
  }
function keyPressed() {// INTERACCIÓN CON TECLADO
  if (key == '1') modoInteraccion = "objeto";// Cambiar modo de interacción
  if (key == '2') modoInteraccion = "curva";
  if (key == '3') modoInteraccion = "fractal";
  if (modoInteraccion == "objeto") {// Control de movimiento con teclas (modo objeto)
    if (keyCode == LEFT_ARROW) pos.x -= 10;
    if (keyCode == RIGHT_ARROW) pos.x += 10;
    if (keyCode == UP_ARROW) pos.y -= 10;
    if (keyCode == DOWN_ARROW) pos.y += 10; }
  if (modoInteraccion == "fractal") {  // Control de parámetros del fractal (modo fractal)
    if (key == '+') fractalProfundidad = min(fractalProfundidad + 1, 8);
    if (key == '-') fractalProfundidad = max(fractalProfundidad - 1, 1);
    sliderProfundidad.value(fractalProfundidad);}
  if (key == 'r' || key == 'R') {// Reiniciar posición del osito
    pos.x = 600;
    pos.y = 350;
    escala = 1.0;
    angulo = 0;
    shearValor = 0;
    sliderEscala.value(1.0);
    sliderRotacion.value(0);
    sliderShear.value(0); }
  if (key == 'c' || key == 'C') {// Reiniciar curva
    bezierPuntos = [
      { x: 200, y: 500 },
      { x: 350, y: 300 },
      { x: 500, y: 300 },
      { x: 650, y: 500 }
    ]; }
}