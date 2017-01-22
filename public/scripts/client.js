$(function(){
  console.log('document loaded');


  $('form').on('submit', doMath);
  // submits the math data calculation.

  $('#clearResults').on('click', clearResults);
  // clears the results

}); // closes doc ready


function clearResults () {
// this function clears the calculation result queue
  $('#calculatorDisplay').html( '<p></p> <p></p> <p></p> <p></p> <p></p>');
  // 5 <p> tags allows the display to limit to 5 previous results.
}; // closes clearResults


function doMath(event) {
  // this function POSTs the data to the server to do the calculation
  event.preventDefault(); // stop the browser from trying to reload our page

  // get the information out of the form and POSTs it
  var mathData = $(this).serialize(); // xValue=7&yValue=14&operation=add


var a = mathData.indexOf('=', mathData.length - 13);
var b = mathData.substring(a+1);
// a and b are placeholders to determine the route.

  $.ajax({
    url: '/math/' + b,
    type: 'POST',
    data: mathData,
    success: getResult,
    error: displayError
  });
}; // closes doMath


function getResult () {
// gets the result back from the server after the POST was successful
  $.ajax({
    url: '/math',
    type: 'GET',
    success: displayResult
  });
}

function displayResult (mathData) {
// this function takes the results of the GET request and appends it to the DOM
// mathData: Object {xValue: "7", yValue: "14", operation: "add", result: 21, resultString: "7 + 14 = 21"}
console.log(mathData);



var mathToDisplay = '<p>' + mathData.resultString + '</p>'; // the new result
var currentDisplay = $('#calculatorDisplay').html();  // the previous results.

$('#calculatorDisplay').empty();   // clears out all results
$('#calculatorDisplay').append(mathToDisplay);   // appends the new result
$('#calculatorDisplay').append(currentDisplay);  // appends the old result


  currentDisplay = $('#calculatorDisplay').html();
//   this section trims current html to only 5 calculations
        var count = 0; // number of <p> tags counted
        var pos = 0;   // position of current <p> tag
        var posprev = 0; // poition of last <p> tag. this is where we stop.

        while (!(pos == -1 || count > 5)) {
          posprev = pos; // saves the previous position
          count++;
          pos = currentDisplay.indexOf('<p>', pos + 1); // finds the next <p>
// help from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
        };
        currentDisplay = currentDisplay.substring(0,posprev);

$('#calculatorDisplay').empty(); // rewrites the current display again.
$('#calculatorDisplay').append(currentDisplay);

}; // closes displayResult


function displayError (response) {
  console.log('error response: ', response);
  $('#errormessage').text('Could not complete calculation: ' + response.responseText);

};
