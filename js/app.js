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
  this.selectionPercentage;
  ProductImage.productImageArray.push(this);
};

ProductImage.productImageArray = [];
ProductImage.pastSelectionArray = [];
ProductImage.rankedSelectionArray = [];

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