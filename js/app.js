'use strict';
/***********************************
*         Global Variables         *
************************************/

var productOptionOneLabel = document.getElementById('productOptionOne');
var productOptionTwoLabel = document.getElementById('productOptionTwo');
var productOptionThreeLabel = document.getElementById('productOptionThree');
var resultsTable = document.getElementById('results');

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

ProductImage.renderRandomThree = function () {

  pickRandomThree();
  productOptionOneLabel.src = ProductImage.productImageArray[ProductImage.pastSelectionArray[0]].src;
  productOptionTwoLabel.src = ProductImage.productImageArray[ProductImage.pastSelectionArray[1]].src;
  productOptionThreeLabel.src = ProductImage.productImageArray[ProductImage.pastSelectionArray[2]].src;

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
ProductImage.renderRandomThree();
/***********************************
*         Helper Functions         *
************************************/

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

// var pastSelection1 = 0;
// var pastSelection2 = 4;

// GoatImage.renderTwoRandomly = function () {
//   do {
//     var randomNumber1 = Math.floor(Math.random() * GoatImage.goatArray.length);
//   } while(randomNumber1 == pastSelection1 || randomNumber1 == pastSelection2);

//   do {
//     var randomNumber2 = Math.floor(Math.random() * GoatImage.goatArray.length);
//   } while (randomNumber2 === randomNumber1 || randomNumber2 === pastSelection1 || randomNumber2 === pastSelection2);

//   goatImage1.src = GoatImage.goatArray[randomNumber1].src;
//   goatImage2.src = GoatImage.goatArray[randomNumber2].src;

//   goatImage1.dataset.index = randomNumber1;
//   goatImage2.dataset.index = randomNumber2;

//   pastSelection1 = randomNumber1;
//   pastSelection2 = randomNumber2;
// };
