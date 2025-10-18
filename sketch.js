let table;

function preload() {
  table = loadTable("assets/dataset.csv", "csv", "header");
}

function setup() {

  //  padding relativi a ogni casella
  let paddingLeftCell = 30;
  let paddingRightCell = 50;
  let paddingTopCell = 150;
  let paddingBottomCell = 150;

  let outerPadding = 50;
  let itemSize = 110;
  let rowCount = table.getRowCount();

  //  dimensione di una cella considerando il padding interno
  let cellWidth = itemSize + paddingLeftCell + paddingRightCell;
  let cellHeight = itemSize + paddingTopCell + paddingBottomCell;

  //  numero di colonne che ci stanno in larghezza
  let cols = floor((windowWidth - outerPadding * 2) / cellWidth);
  cols = max(cols, 1);

  let rows = ceil(rowCount / cols);

  let totalHeight = outerPadding * 2 + rows * cellHeight;
  createCanvas(windowWidth, totalHeight);
  colorMode(HSB, 360, 100, 100);
  background("black");

  //  Disegno i fiori
  for (let rowNumber = 0; rowNumber < rowCount; rowNumber++) {
    let data = table.getRow(rowNumber).obj;

    // valori assoluti
    let c0 = abs(float(data.column0));
    let c1 = abs(float(data.column1));
    let c2 = abs(float(data.column2));
    let c3 = abs(float(data.column3));
    let c4 = abs(float(data.column4));

    let centerSize  = map(c0, 0, 100, 10, 60);
    let numPetals   = int(map(c1, 0, 100, 3, 15));
    let stemLength  = map(c3, 0, 100, 50, 250);
    let numLeaves   = int(map(c4, 0, 100, 0, 6));
    let colorVal = c2;   
    let petalLength = 70;    

    // posizione nella griglia
    let col = rowNumber % cols;
    let row = floor(rowNumber / cols);

    let xPos = outerPadding + col * cellWidth + paddingLeftCell + itemSize / 2;
    let yPos = outerPadding + row * cellHeight + paddingTopCell + itemSize / 2;

    push();
    translate(xPos, yPos);
    drawFlower(centerSize, numPetals, colorVal, stemLength, numLeaves, petalLength);
    pop();
  }
}

function drawFlower(centerSize, numPetals, colorVal, stemLength, numLeaves, petalLength) {

  //  Stelo
  stroke(120, 80, 50);
  strokeWeight(6);
  line(0, centerSize + 20, 0, stemLength + centerSize);

  // Foglie
  let leafColor = color(120, 60, 70);
  let leafSpacing = stemLength / (numLeaves + 1);
  let halfLeaves = ceil(numLeaves / 2);

  // Destra
  for (let i = 0; i < halfLeaves; i++) {
    let yPos = centerSize  + (i + 1) * leafSpacing;
    push();
    translate(0, yPos);
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
    scale(-1, 1);
    fill(leafColor);
    noStroke();
    ellipse(20, 0, 40, 20);
    pop();
  }

  // Petali
  let hue = map(colorVal, 0, 100, 0, 360);
  for (let i = 0; i < numPetals; i++) {
    let angle = TWO_PI / numPetals * i;
    push();
    rotate(angle);
    fill(hue, 80, 100);
    noStroke();
    ellipse(petalLength / 2, 0, petalLength, petalLength / 2);
    pop();
  }

  //  Centro
  fill(50, 80, 90);
  noStroke();
  ellipse(0, 0, centerSize * 2, centerSize * 2);
}
