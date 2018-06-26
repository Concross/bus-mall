'use strict';
/***********************************
*         Global Variables         *
************************************/

var productOptionOneLabel = document.getElementById('productOptionOne');
var productOptionTwoLabel = document.getElementById('productOptionTwo');
var productOptionThreeLabel = document.getElementById('productOptionThree');
var productSelectionForm = document.getElementById('productSelectionForm');
var resultsTable = document.getElementById('results');
var overallClicks = 0;

/***********************************
*      Product Image Object        *
************************************/
function ProductImage(name, src, id) {
  this.name = name;
  this.src = src;
  this.id = id;
  this.numTimesClicked = 0;
  this.numTimesDisplayed = 0;
  this.percentageClicked;
  ProductImage.productImageArray.push(this);
};

ProductImage.productImageArray = [];
ProductImage.pastSelectionArray = [];
console.log(ProductImage.rankedSelectionArray);

// Render three random images for selection
ProductImage.renderRandomThree = function () {

  pickRandomThree();
  productOptionOneLabel.src = ProductImage.productImageArray[ProductImage.pastSelectionArray[0]].src;
  productOptionOneLabel.id = ProductImage.productImageArray[ProductImage.pastSelectionArray[0]].id;

  productOptionTwoLabel.src = ProductImage.productImageArray[ProductImage.pastSelectionArray[1]].src;
  productOptionTwoLabel.id = ProductImage.productImageArray[ProductImage.pastSelectionArray[1]].id;

  productOptionThreeLabel.src = ProductImage.productImageArray[ProductImage.pastSelectionArray[2]].src;
  productOptionThreeLabel.id = ProductImage.productImageArray[ProductImage.pastSelectionArray[2]].id;

};

// Create a table using the available rankings;
ProductImage.renderRankedTable = function () {
  calcPercentageClicked();
  createHeaderRow();
  for (var i in ProductImage.productImageArray){
    var trEl = document.createElement('tr');
    createElAndAppend('th', ProductImage.productImageArray[i].name, trEl);
    createElAndAppend('td', ProductImage.productImageArray[i].numTimesClicked, trEl);
    createElAndAppend('td', ProductImage.productImageArray[i].numTimesDisplayed, trEl);
    createElAndAppend('td', ProductImage.productImageArray[i].percentageClicked, trEl);
    resultsTable.appendChild(trEl);
  }

};
/***********************************
*         Event Listeners          *
************************************/
productSelectionForm.addEventListener('submit', productSelectionBtnHandler);

/***********************************
*         Event Handlers           *
************************************/
function productSelectionBtnHandler (event) {
  event.preventDefault();
  overallClicks += 1;
  for (var i = 0; i < productSelectionForm.productOptions.length; i++){
    ProductImage.productImageArray[ProductImage.pastSelectionArray[i]].numTimesDisplayed += 1;
    if (productSelectionForm.productOptions[i].checked) {
      ProductImage.productImageArray[ProductImage.pastSelectionArray[i]].numTimesClicked += 1;
    }
  }
  if (overallClicks === 25) {
    productSelectionForm.style.display = 'none';
    ProductImage.renderRankedTable();
    resultsTable.style.display = 'block';
  }
  ProductImage.renderRandomThree();
}


/***********************************
*         Helper Functions         *
************************************/

// Generate 3 unique random numbers from within array range
function pickRandomThree() {

  do {
    var randNum1 = Math.floor(Math.random() * ProductImage.productImageArray.length);
  } while (ProductImage.pastSelectionArray.includes(randNum1));

  do {
    var randNum2 = Math.floor(Math.random() * ProductImage.productImageArray.length);
  } while (randNum2 === randNum1 || ProductImage.pastSelectionArray.includes(randNum2));

  do {
    var randNum3 = Math.floor(Math.random() * ProductImage.productImageArray.length);
  } while (randNum3 === randNum2 || randNum3 === randNum1 || ProductImage.pastSelectionArray.includes(randNum3));

  ProductImage.pastSelectionArray = [randNum1, randNum2, randNum3];

  return ProductImage.pastSelectionArray;

}


// Function that tries to create a ranked array
function createRankedArray() {
  calcPercentageClicked();
  var rankedSelectionArray = ProductImage.productImageArray;
  rankedSelectionArray.sort(function(a, b){parseFloat(a.percentageClicked) - parseFloat(b.percentageClicked);});
  rankedSelectionArray = rankedSelectionArray.reverse();
  return rankedSelectionArray;

}

// Helper function to calculate the percentage clicked for each object
function calcPercentageClicked() {
  for (var product in ProductImage.productImageArray) {
    ProductImage.productImageArray[product].percentageClicked = 100 * (ProductImage.productImageArray[product].numTimesClicked / ProductImage.productImageArray[product].numTimesDisplayed);
    console.log(ProductImage.productImageArray[product].name + ': ' + ProductImage.productImageArray[product].percentageClicked);
  }
}

function createElAndAppend(el, content, parent) {
  var newEl = document.createElement(el);
  newEl.textContent = content;
  parent.appendChild(newEl);
};

// Helper function to create a header row
function createHeaderRow() {

  var trEl = document.createElement('tr');
  createElAndAppend('th', 'Products', trEl);
  createElAndAppend('th', 'Total # Clicks', trEl);
  createElAndAppend('th', 'Total # Appearances', trEl);
  createElAndAppend('th', 'Clicked Percentage', trEl);

  resultsTable.appendChild(trEl);
};

new ProductImage('Bag', './img/bag.jpg', 'bagImg');
new ProductImage('Banana', './img/banana.jpg', 'bananaImg');
new ProductImage('Bathroom', './img/bathroom.jpg', 'bathroomImg');
new ProductImage('Boots', './img/boots.jpg', 'bootsImg');
new ProductImage('Breakfast', './img/breakfast.jpg', 'breakfastImg');
new ProductImage('Bubblegum', './img/bubblegum.jpg', 'bubblegumImg');
new ProductImage('Chair', './img/chair.jpg', 'chairImg');
new ProductImage('Cthulhu', './img/cthulhu.jpg', 'cthulhuImg');
new ProductImage('Dog Duck', './img/dog-duck.jpg', 'dogDuckImg');
new ProductImage('Dragon', './img/dragon.jpg', 'dragonImg');
new ProductImage('Pen', './img/pen.jpg', 'penImg');
new ProductImage('Pet Sweep', './img/pet-sweep.jpg', 'petSweepImg');
new ProductImage('Scissors', './img/scissors.jpg', 'scissorsImg');
new ProductImage('Shark', './img/shark.jpg', 'sharkImg');
new ProductImage('Sweep', './img/sweep.png', 'sweepImg');
new ProductImage('Tauntaun', './img/tauntaun.jpg', 'tauntaunImg');
new ProductImage('Unicorn', './img/unicorn.jpg', 'unicornImg');
new ProductImage('USB', './img/usb.gif', 'usbImg');
new ProductImage('Water Can', './img/water-can.jpg', 'waterCanImg');
new ProductImage('Wine Glass', './img/wine-glass.jpg', 'wineGlassImg');

ProductImage.renderRandomThree();