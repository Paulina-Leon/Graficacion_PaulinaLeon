function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250);

  dibujarCorazon(150, 150);
}


function dibujarCorazon(x, y) {

  fill(0,255,0)
  noStroke();

  // círculos
  fill(255, 0, 0);
  circle(x - 5, y - 10, 15);
  fill(0, 0, 255);
  circle(x + 5, y - 10, 15);
  fill(255, 200, 0);
  circle(x + 0, y - 15, 15);
  // triángulo
  triangle(
    x - 13, y - 11,
    x + 13, y - 11,
    x, y + 10
  );
}