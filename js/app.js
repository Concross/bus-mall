'use strict';


/***********************************
*         Global Variables         *
************************************/
var optionOneHeader = document.getElementById('optionOneHeader');
var productOptionOneLabel = document.getElementById('productOptionOne');

var optionTwoHeader = document.getElementById('optionTwoHeader');
var productOptionTwoLabel = document.getElementById('productOptionTwo');

var optionThreeHeader = document.getElementById('optionThreeHeader');
var productOptionThreeLabel = document.getElementById('productOptionThree');

var productSelectionForm = document.getElementById('productSelectionForm');
var resultsTable = document.getElementById('results');
var overallClicks = 0;

// Arrays for the chart
var labelsArray = [];
var clicksArray = [];
var numTimesDisplayedArray = [];
var percentClickedArray = [];

var chartColors = ['#E52B50', '#FFBF00', '#9966CC', '#FBCEB1', '#7FFFD4', '#007FFF', '#7FFF00', '#50C878', '#FFF700', '#EDC9AF', '#8E4585', '#808000', '#FFA500', '#FF2400', '#C0C0C0', '#40826D', '#C71585', '#92000A', '#FFC0CB', '#FF4500'];

var clicksChart;
var chartDrawn = false;
hideChart();

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

// Render three random images for selection
ProductImage.renderRandomThree = function () {

  pickRandomThree();
  productOptionOneLabel.src = ProductImage.productImageArray[ProductImage.pastSelectionArray[0]].src;
  optionOneHeader.textContent = ProductImage.productImageArray[ProductImage.pastSelectionArray[0]].name;
  productOptionOneLabel.id = ProductImage.productImageArray[ProductImage.pastSelectionArray[0]].id;

  productOptionTwoLabel.src = ProductImage.productImageArray[ProductImage.pastSelectionArray[1]].src;
  optionTwoHeader.textContent = ProductImage.productImageArray[ProductImage.pastSelectionArray[1]].name;
  productOptionTwoLabel.id = ProductImage.productImageArray[ProductImage.pastSelectionArray[1]].id;

  productOptionThreeLabel.src = ProductImage.productImageArray[ProductImage.pastSelectionArray[2]].src;
  optionThreeHeader.textContent = ProductImage.productImageArray[ProductImage.pastSelectionArray[2]].name;
  productOptionThreeLabel.id = ProductImage.productImageArray[ProductImage.pastSelectionArray[2]].id;

};

// Create a table using the available rankings;
ProductImage.renderRankedTable = function () {
  // createRankedArray();
  calcPercentageClicked();
  createHeaderRow();
  for (var i in ProductImage.productImageArray) {
    var trEl = document.createElement('tr');
    createElAndAppend('th', ProductImage.productImageArray[i].name, trEl);
    createElAndAppend('td', ProductImage.productImageArray[i].numTimesClicked + ' clicks for ' + ProductImage.productImageArray[i].name, trEl);
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
function productSelectionBtnHandler(event) {
  event.preventDefault();
  for (var i = 0; i < productSelectionForm.productOptions.length; i++) {
    var currentObject = ProductImage.productImageArray[ProductImage.pastSelectionArray[i]];

    currentObject.numTimesDisplayed += 1;
    if (productSelectionForm.productOptions[i].checked) {
      overallClicks += 1;
      currentObject.numTimesClicked += 1;
    }
  }
  if (overallClicks === 25) {
    productSelectionForm.style.display = 'none';
    drawChart();
    ProductImage.renderRankedTable();
    resultsTable.style.display = 'block';
  }
  ProductImage.renderRandomThree();
}


/***********************************
*         Helper Functions         *
************************************/

// Update chart arrays for drawing
function updateChartArrays() {
  for (var i = 0; i < ProductImage.productImageArray.length; i++) {
    var currentObject = ProductImage.productImageArray[i];
    labelsArray.push(currentObject.name);
    clicksArray.push(currentObject.numTimesClicked);
    numTimesDisplayedArray.push(currentObject.numTimesDisplayed);
    
    calcPercentageClicked();
    percentClickedArray.push(currentObject.percentageClicked);
  }
}

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
  var rankedSelectionArray = ProductImage.productImageArray.splice(0);
  for (var i = 0; i < rankedSelectionArray.length; i++) {
    //iterate through the array and sort from high to low
  }
  return rankedSelectionArray;
}

// Helper function to calculate the percentage clicked for each object
function calcPercentageClicked() {
  for (var product in ProductImage.productImageArray) {
    var currentObject = ProductImage.productImageArray[product];
    if (currentObject.numTimesDisplayed === 0) {
      currentObject.percentageClicked = 0;
    } else {
      currentObject.percentageClicked = 100 * (currentObject.numTimesClicked / currentObject.numTimesDisplayed);
    }
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
new ProductImage('Sweep', './img/sweep.jpg', 'sweepImg');
new ProductImage('Tauntaun', './img/tauntaun.jpg', 'tauntaunImg');
new ProductImage('Unicorn', './img/unicorn.jpg', 'unicornImg');
new ProductImage('USB', './img/usb.gif', 'usbImg');
new ProductImage('Water Can', './img/water-can.jpg', 'waterCanImg');
new ProductImage('Wine Glass', './img/wine-glass.jpg', 'wineGlassImg');

ProductImage.renderRandomThree();


// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// Charts rendered using Chart JS v.2.7.2
// http://www.chartjs.org/
// ++++++++++++++++++++++++++++++++++++++++++++

var data = {
  labels: labelsArray, // titles array we declared earlier
  datasets: [{
    data: percentClickedArray, // votes array we declared earlier
    backgroundColor: chartColors,
    hoverBackgroundColor: 'white'
  }]
};

function drawChart() {
  updateChartArrays();
  var ctx = document.getElementById('votes-chart').getContext('2d');

  clicksChart = new Chart(ctx, {
    type: 'pie',
    data: data, //created above
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });

  chartDrawn = true;
}

function hideChart() {
  document.getElementById('votes-chart').hidden = true;
}