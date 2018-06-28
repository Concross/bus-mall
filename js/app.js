'use strict';

/***********************************
*         Global Variables         *
************************************/
var productSelectionForm = document.getElementById('productSelectionForm');
var resultsTable = document.getElementById('results');

// Array for containing html element objects for dom access
var htmlArray = [];

var sessionClicks = 0;

if (localStorage.getItem('sessionClicks')) {
  sessionClicks = JSON.parse(localStorage.getItem('sessionClicks'));
}

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
*     Product Display Object       *
************************************/
function ProductDisplay(headerElId, imgElId) {
  this.header = document.getElementById(headerElId);
  this.img = document.getElementById(imgElId);
  htmlArray.push(this);
}

new ProductDisplay('optionOneHeader', 'optionOneImg');
new ProductDisplay('optionTwoHeader', 'optionTwoImg');
new ProductDisplay('optionThreeHeader', 'optionThreeImg');

/***********************************
*      Product Item Object        *
************************************/
// ProductItem Constructor function
function ProductItem(name, src, id) {
  this.name = name;
  this.src = src;
  this.id = id;
  this.numTimesClicked = 0;
  this.numTimesDisplayed = 0;
  this.percentageClicked = 0.0;
  ProductItem.productItemArray.push(this);
};

ProductItem.productItemArray = [];
ProductItem.pastSelectionArray = [];

// Render three random images for selection
ProductItem.renderRandomItem = function () {

  pickRandomThree();
  // This loop renders any number of ProductItems for exactly as many ProductDisplay objects exist in the htmlArray
  for (var i = 0; i < htmlArray.length; i++) {
    htmlArray[i].header.textContent = ProductItem.productItemArray[ProductItem.pastSelectionArray[i]].name;
    htmlArray[i].img.src = ProductItem.productItemArray[ProductItem.pastSelectionArray[i]].src;
  }

};

// Create a table using the available rankings;
ProductItem.renderRankedTable = function () {
  calcPercentageClicked();
  createHeaderRow();
  createTableBody();
  resultsTable.style.display = 'table';

};

new ProductItem('Bag', './img/bag.jpg', 'bagImg');
new ProductItem('Banana', './img/banana.jpg', 'bananaImg');
new ProductItem('Bathroom', './img/bathroom.jpg', 'bathroomImg');
new ProductItem('Boots', './img/boots.jpg', 'bootsImg');
new ProductItem('Breakfast', './img/breakfast.jpg', 'breakfastImg');
new ProductItem('Bubblegum', './img/bubblegum.jpg', 'bubblegumImg');
new ProductItem('Chair', './img/chair.jpg', 'chairImg');
new ProductItem('Cthulhu', './img/cthulhu.jpg', 'cthulhuImg');
new ProductItem('Dog Duck', './img/dog-duck.jpg', 'dogDuckImg');
new ProductItem('Dragon', './img/dragon.jpg', 'dragonImg');
new ProductItem('Pen', './img/pen.jpg', 'penImg');
new ProductItem('Pet Sweep', './img/pet-sweep.jpg', 'petSweepImg');
new ProductItem('Scissors', './img/scissors.jpg', 'scissorsImg');
new ProductItem('Shark', './img/shark.jpg', 'sharkImg');
new ProductItem('Sweep', './img/sweep.jpg', 'sweepImg');
new ProductItem('Tauntaun', './img/tauntaun.jpg', 'tauntaunImg');
new ProductItem('Unicorn', './img/unicorn.jpg', 'unicornImg');
new ProductItem('USB', './img/usb.gif', 'usbImg');
new ProductItem('Water Can', './img/water-can.jpg', 'waterCanImg');
new ProductItem('Wine Glass', './img/wine-glass.jpg', 'wineGlassImg');

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
    var currentObject = ProductItem.productItemArray[ProductItem.pastSelectionArray[i]];

    currentObject.numTimesDisplayed += 1;
    if (productSelectionForm.productOptions[i].checked) {
      sessionClicks += 1;
      currentObject.numTimesClicked += 1;
    }
  }

  localStorage.setItem('sessionClicks', sessionClicks);

  if (sessionClicks === 25) {
    productSelectionForm.style.display = 'none';
    drawChart();
    ProductItem.renderRankedTable();
    sessionClicks = 0;
    localStorage.setItem('sessionClicks', sessionClicks);
  }
  ProductItem.renderRandomItem();
  updateLocalStorage();
}


/***********************************
*         Helper Functions         *
************************************/
// Render table body
function createTableBody() {
  var percentageClickedRankArray = createRankedArray(); 
  for (var i in percentageClickedRankArray) {
    var trEl = document.createElement('tr');
    createElAndAppend('th', percentageClickedRankArray[i].name, trEl);
    createElAndAppend('td', percentageClickedRankArray[i].numTimesClicked + ' clicks for ' + percentageClickedRankArray[i].name, trEl);
    createElAndAppend('td', percentageClickedRankArray[i].numTimesDisplayed, trEl);
    createElAndAppend('td', percentageClickedRankArray[i].percentageClicked, trEl);
    resultsTable.appendChild(trEl);
  }
}

// Update chart arrays for drawing
function updateChartArrays() {
  for (var i = 0; i < ProductItem.productItemArray.length; i++) {
    var currentObject = ProductItem.productItemArray[i];
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
    var randNum1 = Math.floor(Math.random() * ProductItem.productItemArray.length);
  } while (ProductItem.pastSelectionArray.includes(randNum1));

  do {
    var randNum2 = Math.floor(Math.random() * ProductItem.productItemArray.length);
  } while (randNum2 === randNum1 || ProductItem.pastSelectionArray.includes(randNum2));

  do {
    var randNum3 = Math.floor(Math.random() * ProductItem.productItemArray.length);
  } while (randNum3 === randNum2 || randNum3 === randNum1 || ProductItem.pastSelectionArray.includes(randNum3));

  ProductItem.pastSelectionArray = [randNum1, randNum2, randNum3];

  return ProductItem.pastSelectionArray;

}

// Helper function to calculate the percentage clicked for each object
function calcPercentageClicked() {
  for (var product in ProductItem.productItemArray) {
    var currentObject = ProductItem.productItemArray[product];
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

// Returns a sorted array based on percentageClicked properties of ProductItem objects
function createRankedArray() {
  var rankedArray = ProductItem.productItemArray.slice();
  rankedArray.sort(function(a, b){return a.percentageClicked - b.percentageClicked;});
  return rankedArray.reverse();
}

ProductItem.renderRandomItem();

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
    hoverBackgroundColor: 'gray'
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

/***********************************
*     Local Storage                *
************************************/
function updateProductItemStorage() {
  localStorage.setItem('productItemArray', JSON.stringify(ProductItem.productItemArray));
}

function updatePastProductSelection() {
  localStorage.setItem('pastSelectionArray', JSON.stringify(ProductItem.pastSelectionArray));
}

function updateLocalStorage() {
  updateProductItemStorage();
  updatePastProductSelection();
}