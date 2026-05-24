let angulo = 0;

let estrellas = [];

let fondoR = 15;
let fondoG = 10;
let fondoB = 35;

function setup() {

    createCanvas(800, 600, WEBGL);

    // estrellas
    for(let i = 0; i < 200; i++){

        estrellas.push({
            x: random(-1000,1000),
            y: random(-1000,1000),
            z: random(-1000,1000),
            size: random(1,4)
        });
    }
}

function draw() {

    background(fondoR, fondoG, fondoB);

    // mover camara
    orbitControl();


    // 🌌 LUCES

    // luz ambiental
    ambientLight(80);

    // luz direccional azul
    directionalLight(150, 180, 255, 1, 1, -1);

    // luz rosa
    pointLight(255, 100, 200, 0, 0, 300);

    // luz morada
    pointLight(180, 100, 255, -300, -200, 200);


    // ✨ ESTRELLAS
    push();

    noStroke();

    for(let e of estrellas){

        push();

        translate(e.x, e.y, e.z);

        ambientMaterial(255,255,255);

        sphere(e.size);

        pop();
    }

    pop();



    // 💖 ESFERA ROSA
    push();

    rotateY(angulo);

    translate(-220, 0, 0);

    specularMaterial(255,150,220);

    sphere(80);

    pop();



    // 💙 TOROIDE AZUL
    push();

    rotateX(angulo);

    rotateY(angulo);

    translate(220, 0, 0);

    ambientMaterial(150,200,255);

    torus(80,25);

    pop();



    // 💜 CONO CENTRAL
    push();

    rotateZ(angulo);

    rotateX(angulo);

    normalMaterial();

    cone(90,160);

    pop();



    // 🌸 MINI ESFERAS FLOTANTES
    for(let i = 0; i < 6; i++){

        push();

        rotateY(angulo + i);

        translate(0, sin(frameCount * 0.02 + i) * 100, 250);

        ambientMaterial(255,180,220);

        sphere(20);

        pop();
    }



    // 🌙 PISO GALAXIA
    push();

    rotateX(HALF_PI);

    translate(0,300,0);

    ambientMaterial(80,50,120);

    plane(2000,2000);

    pop();



    // animacion
    angulo += 0.01;
}



// 🎮 INTERACCION TECLADO
function keyPressed(){

    // cambiar colores fondo
    if(key === 'F'){

        fondoR = random(0,50);
        fondoG = random(0,50);
        fondoB = random(40,100);
    }
}