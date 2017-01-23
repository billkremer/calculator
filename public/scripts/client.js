var xySwitch = "x";
var operatorSetFlag = false;

var newMathDataObject = {
  xValueString: "",
  yValueString: "",
  operation: "",
  result: "",
  resultString: "",
}


$(function(){
  console.log('document loaded');

  $('button').on('click', function (event) {
    event.preventDefault(); // prevents page reloading

    if ($(this).hasClass('calcNumber')) {
      newMathDataObject[xySwitch+'ValueString'] += $(this).val();
      console.log(newMathDataObject.xValueString, "xValueString");
      console.log(newMathDataObject.yValueString,"yValueString");

      if (xySwitch == "y") {
        operatorSetFlag = true;
      }; // makes sure a second operator isn't set after yValue entrys
    redrawCurrentCalculation(newMathDataObject);
    }; // works // closes hasClass calcNumber


    if ($(this).hasClass('decimal')) {
    // need to make sure we haven't already added a decimal

      if (xySwitch == "y") {
        operatorSetFlag = true;
      }; // makes sure a second operator isn't set after yValue entry

    if (newMathDataObject[xySwitch+'ValueString'] == "") {
      newMathDataObject[xySwitch+'ValueString'] = "0"
    };

      if (newMathDataObject[xySwitch+'ValueString'].indexOf(".") == -1) {
      // -1 indicates it does not exist
        newMathDataObject[xySwitch+'ValueString'] += $(this).val();
        console.log(newMathDataObject.xValueString, "xValueString");
        console.log(newMathDataObject.yValueString,"yValueString");
      };
      redrawCurrentCalculation(newMathDataObject);
    }; // closes hasclass decimal // works



    if ($(this).attr('id') == "plusMinus") {
      if (newMathDataObject[xySwitch+'ValueString'] == "") {
        newMathDataObject[xySwitch+'ValueString'] = "-"
      } else {
        newMathDataObject[xySwitch+'ValueString'] =  (-1) * (parseFloat(newMathDataObject[xySwitch+'ValueString']));
        newMathDataObject[xySwitch+'ValueString'] = String(newMathDataObject[xySwitch+'ValueString']);
      };

      redrawCurrentCalculation(newMathDataObject);
    }; // closes plusMinus

    if($(this).attr('id') == "backspace") {
        var i = newMathDataObject[xySwitch+'ValueString'].length - 1;
        newMathDataObject[xySwitch+'ValueString'] = newMathDataObject[xySwitch+'ValueString'].substring(0,i);
        // console.log( newMathDataObject[xySwitch+'ValueString'] ,'backsies');
        redrawCurrentCalculation(newMathDataObject);
    }

    if($(this).attr('id') == "clearMath") {
      resetCalculation();
      redrawCurrentCalculation(newMathDataObject);
    };


    if ($(this).hasClass('operator')) {
      if (!operatorSetFlag) { // the operator is set when the yValue entry is started
          // if the opeartor is set, we don't want to add another now.
        if (newMathDataObject.xValueString == "") {newMathDataObject.xValueString = "0"};
        xySwitch = "y";
        newMathDataObject.operation = $(this).val();  // this ensures that it can change until the yvalue is started and the
      };
      redrawCurrentCalculation(newMathDataObject);
    }; // hasclass operator closer

    if ($(this).hasClass('equals')) {
      if (newMathDataObject.yValueString == "") {newMathDataObject.yValueString = 0};

      console.log(newMathDataObject);

       doMath(newMathDataObject);

       //reset newMathDataObject
       resetCalculation();
       redrawCurrentCalculation(newMathDataObject);
    }; // equals closer

  }); // close big  click function with ifs
}); // closes doc ready

function redrawCurrentCalculation(newMathDataObject) {
  $('#currentCalculationDisplay').empty();

  var mathSymbols = {
    add: " + ",
    subtract: " - ",
    multiply: " &times; ",
    divide: " &divide; ",
    squareRoot: "&radic;"
  };

  var operatorPlaceHolder = mathSymbols[newMathDataObject.operation];


  if ( operatorPlaceHolder == undefined ) {
    operatorPlaceHolder = "";
  };

  if ([newMathDataObject.operation] !== "squareRoot") {
    var $displayString = $("<p>" + newMathDataObject.xValueString + operatorPlaceHolder + newMathDataObject.yValueString + "</p>");
  }; // creates string for typical math

  if ([newMathDataObject.operation] == "squareRoot") {
    var $displayString = $("<p>" + operatorPlaceHolder + "<span id='sqrRt'> " + newMathDataObject.xValueString + " </span></p>");
  }; // creates string for typical math

  $('#currentCalculationDisplay').append($displayString);



};


function resetCalculation () {
  xySwitch = "x";
  operatorSetFlag = false;

  newMathDataObject = { xValueString: "",
                        yValueString: "",
                        operation: "",
                        result: "",
                        resultString: "",
                      };
  redrawCurrentCalculation(newMathDataObject);
};


function clearResults () {
// this function clears the calculation result queue
  $('#previousCalculationDisplay').html( '<p></p> <p></p> <p></p> <p></p> <p></p>');
  // 5 <p> tags allows the display to limit to 5 previous results.
}; // closes clearResults


function doMath(mathData) {

console.log(mathData); //

  $.ajax({
    url: '/math/' + mathData.operation,
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
var currentDisplay = $('#previousCalculationDisplay').html();  // the previous results.

$('#previousCalculationDisplay').empty();   // clears out all results
$('#previousCalculationDisplay').append(mathToDisplay);   // appends the new result
$('#previousCalculationDisplay').append(currentDisplay);  // appends the old result


  currentDisplay = $('#previousCalculationDisplay').html();
//   this section trims current html to only 5 calculations
        var count = 0; // number of <p> tags counted
        var pos = 0;   // position of current <p> tag
        var posprev = 0; // poition of last <p> tag. this is where we stop.

        while (!(pos == -1 || count > 5)) {
          posprev = pos; // saves the previous position
          count++;
          pos = currentDisplay.indexOf('<p>', pos + 1); // finds the next <p>
// help from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf

// should use lastIndexOf() instead.

        };
        currentDisplay = currentDisplay.substring(0,posprev);

$('#previousCalculationDisplay').empty(); // rewrites the current display again.
$('#previousCalculationDisplay').append(currentDisplay);

}; // closes displayResult


function displayError (response) {
  console.log('error response: ', response);
  $('#errormessage').text('Could not complete calculation: ' + response.responseText);

};
