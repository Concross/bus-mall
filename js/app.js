'use strict';
console.log('hi');
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

new ProductImage('Bag', './img/bag.jpg', 'bagImg');
new ProductImage('Banana', './img/banana.jpg', 'bananaImg');
new ProductImage('Bathroom', './img/bathroom.jpg', 'bathroomImg');