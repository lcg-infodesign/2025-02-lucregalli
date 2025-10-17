let table;

function preload() {
  table = loadTable("assets/dataset.csv", "csv", "header");
}

function setup() {

  let outerPadding = 40;
  let padding = 250;
  let itemSize = 150;
  let rowCount = table.getRowCount();

  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding));
  let rows = ceil(rowCount / cols);

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * padding;
  createCanvas(windowWidth, totalHeight);
  colorMode(HSB, 360, 100, 100);
  background("black");

  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) {
    let data = table.getRow(rowNumber).obj;
    //valore assoluto dei valori
    let c0 = abs(float(data.column0));
    let c1 = abs(float(data.column1));
    let c2 = abs(float(data.column2));
    let c3 = abs(float(data.column3));
    let c4 = abs(float(data.column4));

    let centerSize  = map(c0, -100, 100, 10, 60);
    let numPetals   = int(map(c1, -100, 100, 3, 15));
    let stemLength  = map(c3, -100, 100, 50, 250);
    let numLeaves   = int(map(c4, -100, 100, 0, 6));
    let colorVal = c2;   
    let petalLength = 80;    

    let col = rowNumber % cols;
    let row = floor(rowNumber / cols);

    let xPos = outerPadding + col * (itemSize + padding) + itemSize / 2;
    let yPos = outerPadding + row * (itemSize + padding) + itemSize / 2;

    push();
    translate(xPos, yPos);
    drawFlower([centerSize, numPetals, colorVal, stemLength, numLeaves, petalLength]);
    pop();
  }
}

function drawFlower(data) {
  let [centerSize, numPetals, colorVal, stemLength, numLeaves, petalLength] = data;

  // 🎋 Stelo
  stroke(120, 80, 50);
  strokeWeight(6);
  line(0, centerSize + 20, 0, stemLength + centerSize);

 
//  Foglie simmetriche
let leafColor = color(120, 60, 70); // verde foglia
let leafSpacing = stemLength / (numLeaves + 1); // distanza verticale tra foglie
let halfLeaves = ceil(numLeaves / 2); // quante foglie per lato

// Destra
for (let i = 0; i < halfLeaves; i++) {
  let yPos = centerSize  + (i + 1) * leafSpacing;
  push();
  translate(0, yPos);
  scale(1, 1); // lato destro
  fill(leafColor);
  noStroke();
  ellipse(20, 0, 40, 20);
  pop();
}

// Sinistra
for (let i = 0; i < halfLeaves; i++) {
  let yPos = centerSize + (i + 1) * leafSpacing;
  push();
  translate(0, yPos);
  scale(-1, 1); // lato sinistro (simmetrico)
  fill(leafColor);
  noStroke();
  ellipse(20, 0, 40, 20);
  pop();
}

  // Colore petali 
  let hue = map(colorVal, -100, 100, 0, 360);
  let sat = 80;
  let bright = 100;

  //  Petali ovali
  for (let i = 0; i < numPetals; i++) {
    let angle = TWO_PI / numPetals * i;
    push();
    rotate(angle);

    let petalX = petalLength / 2;
    let petalY = 0;

    fill(hue, sat, bright);
    noStroke();
    ellipse(petalX, petalY, petalLength, petalLength / 2);

    pop();
  }

  //  Centro
  fill(50, 80, 90);
  noStroke();
  ellipse(0, 0, centerSize * 2, centerSize * 2);
}
