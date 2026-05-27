/*LEÓN VÁZQUEZ PAULINA ARACELI
 * GRAFICACIÓN - Unidad 4
 * PROYECTO FINAL: Escena 3D interactiva con iluminación, materiales y sombreado
 */
let luzSigueMouse = true;     // ¿La luz puntual sigue al mouse?
let colorFondo = 20;          // Fondo inicial
let modoEsfera = 0;           // 0 = specular, 1 = ambient
let modoCubo = 0;             // 0 = ambient, 1 = fill
let modoToroide = 0;          // 0 = normal, 1 = fill
let angEsfera = 0;// Ángulos de rotación independientes
let angCubo = 0;
let angToro = 0;
let estrellas = [];
function setup() {
  createCanvas(800, 600, WEBGL);
  setAttributes('antialias', true);
  for (let i = 0; i < 120; i++) {// crear estrellas
    estrellas.push({
      x: random(-800, 800),
      y: random(-600, 600),
      z: random(-800, 0),
      brillo: random(100, 255),
      fase: random(TWO_PI)
    }); }
}
function draw() {
  orbitControl();
  background(colorFondo);
  orbitControl(1, 1, 0.5);// Cámara interactiva 
  ambientLight(60);// ILUMINACIÓN
  directionalLight(255, 255, 255, 1, 1, -1);// Luz direccional (simula el sol)
  if (luzSigueMouse) {// Luz puntual (sigue al mouse si está activa)
    let luzX = mouseX - width / 2;
    let luzY = mouseY - height / 2;
    pointLight(255, 200, 150, luzX, luzY, 200); } 
    else {
    pointLight(255, 200, 150, 0, -150, 250); }
    push();
  noStroke();
  for (let e of estrellas) {
    push();
    translate(e.x, e.y, e.z);
    let brillo = e.brillo + sin(frameCount * 0.05 + e.fase) * 80;
    fill(255, 255, 255, brillo);
    sphere(2);
    pop();
  }
  pop();
  //OBJETOS 3D 
  push();// Esfera 
  translate(-220, 130, 60);
  rotateY(angEsfera);
  rotateX(angEsfera * 0.5);
  if (modoEsfera === 0) {
    specularMaterial(255, 100, 100); // rojo brillante
    shininess(60); } 
    else {
    ambientMaterial(255, 100, 100); } // rojo mate
  sphere(100);
  pop();

  push();//Cubo
  translate(0, 0, 0);
  rotateY(angCubo);
  rotateX(angCubo * 0.3);
  if (modoCubo === 0) {
    ambientMaterial(250, 0, 100); }   // rojo mate
   else {
    fill(250, 150, 200);  }  // rojo sólido (sin efecto de luz)
  box(110);
  pop();
  push();// 3. Toroide (izquierda)
  translate(220, -150, 100);
  rotateY(angToro);
  rotateZ(angToro * 0.7);
  if (modoToroide === 0) {
    normalMaterial();  } // colorea según normales
   else {
    fill(100, 200, 100);   } // verde sólido
  torus(70, 25);
  pop();
  angEsfera += 0.012;// Actualizar ángulos de animación
  angCubo += 0.008;
  angToro += 0.01;
}
function keyPressed() {//INTERACCIÓN POR TECLADO 
  if (key === 'L' || key === 'l') {// Tecla L: activar/desactivar luz siguiendo al mouse
    luzSigueMouse = !luzSigueMouse; }
  if (key === 'C' || key === 'c') {// Tecla C: cambiar color de fondo (ciclo de 4 colores)
    if (colorFondo === 20) colorFondo = 10;
    else if (colorFondo === 10) colorFondo = 30;
    else if (colorFondo === 30) colorFondo = 15;
    else colorFondo = 20; }
  if (key === '1') {// Tecla 1: cambiar material de la esfera
    modoEsfera = (modoEsfera + 1) % 2; }
  if (key === '2') {// Tecla 2: cambiar material del cubo
    modoCubo = (modoCubo + 1) % 2; }
  if (key === '3') {  // Tecla 3: cambiar material del toroide
    modoToroide = (modoToroide + 1) % 2; }
}