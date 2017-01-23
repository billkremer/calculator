var express = require('express')
var router = express.Router()

var mathProblemObject = {};

router.get('/', function (req, res) {
// console.log(mathProblemObject, 'space');
// { xValueString: '7.000001',
//   yValueString: '14.00000000001',
//   operation: 'add',
//   result: 21.00000100001,
//   resultString: '7.000001 + 14.00000000001 = 21.00000100001' } 'space'
res.send(mathProblemObject); // this is the object with the data
}); // closes / get




// do all the math here
var result = 0;
var resultString = "";

router.post('/add', function (req, res) {
  console.log('got here!' , req.body);
  result = parseFloat(req.body.xValueString) + parseFloat(req.body.yValueString);
  resultString = req.body.xValueString+ " + " + req.body.yValueString+ " = " + result;
  req.body.result = result; // adds result to req body
  req.body.resultString = resultString; // adds resultString to req body

  mathProblemObject = req.body;
  res.sendStatus(200);
});

router.post('/subtract', function (req, res) {
  result = req.body.xValueString - req.body.yValueString;
  resultString = req.body.xValueString+ " - " + req.body.yValueString + " = " + result;
  req.body.result = result; // adds result to req body
  req.body.resultString = resultString; // adds resultString to req body

  mathProblemObject = req.body;
  res.sendStatus(200);
});

router.post('/multiply', function (req, res) {
  result = req.body.xValueString* req.body.yValueString;
  resultString = req.body.xValueString+ " &times; " + req.body.yValueString + " = " + result;
  req.body.result = result; // adds result to req body
  req.body.resultString = resultString; // adds resultString to req body

  mathProblemObject = req.body;
  res.sendStatus(200);
});

router.post('/divide', function (req, res) {
  if (req.body.yValueString == 0) {
    result = undefined;
    resultString = 'The Calculator cannot divide by zero.';
  } else {
    result = req.body.xValueString/ req.body.yValueString
    resultString = req.body.xValueString+  ' &divide; '  + req.body.yValueString + " = " + result;
  };

  req.body.result = result; // adds result to req body
  req.body.resultString = resultString; // adds resultString to req body

  mathProblemObject = req.body;
  res.sendStatus(200);
});


router.post ('/squareRoot', function (req, res) {
    if (req.body.xValueString< 0) {
      result = req.body.xValueString;
      resultString = 'The Calculator cannot calculate a square root of a negative number. (' + req.body.xValueString+ ')';
    } else {
      result = Math.sqrt(req.body.xValueString);
      resultString = '&radic;<span id="sqrRt" style="text-decoration: overline">&nbsp;' + req.body.xValueString+ '&nbsp;</span> = ' + result;
    };

    req.body.result = result; // adds result to req body
    req.body.resultString = resultString; // adds resultString to req body

    mathProblemObject = req.body;
    res.sendStatus(200);
});





// router.post('/', function (req, res) {
//   // console.log(req.body, 'requbody mathjs123');
// // { xValueString: '123', yValueString: '234', operation: 'subtract' } 'requbody mathjs123'
//
// // console.log('req.params333', req.params); // req.params333 {}
//
// switch (req.body.operation) {
//   case 'add':
//     result = parseFloat(req.body.xValueString) + parseFloat(req.body.yValueString);
//     resultString = req.body.xValueString+ " + " + req.body.yValueString + " = " + result;
//     break;
//
//   case 'subtract':
//     result = req.body.xValueString- req.body.yValueString;
//     resultString = req.body.xValueString+ " - " + req.body.yValueString + " = " + result;
//     break;
//
//   case 'multiply':
//     result = req.body.xValueString* req.body.yValueString;
//     resultString = req.body.xValueString+ " &times; " + req.body.yValueString + " = " + result;
//     break;
//
//   case 'divide':
//     if (req.body.yValueString == 0) {
//       result = undefined;
//       resultString = 'The Calculator cannot divide by zero.';
//     } else {
//       result = req.body.xValueString/ req.body.yValueString
//       resultString = req.body.xValueString+  '&divide;'  + req.body.yValueString + " = " + result;
//     };
//     break;
//
//   case 'squareRoot':
//     if (req.body.xValueString< 0) {
//       result = req.body.xValueString;
//       resultString = 'The Calculator cannot calculate a square root of a negative number. (' + req.body.xValueString+ ')';
//     } else {
//       result = Math.sqrt(req.body.xValueString);
//       resultString = '&radic;<span id="sqrRt" style="text-decoration: overline">&nbsp;' + req.body.xValueString+ '&nbsp;</span> = ' + result;
//     };
//     break;
//
//   default:
//
// }
//
// req.body.result = result; // adds result to req body
// req.body.resultString = resultString; // adds resultString to req body
//
//
// mathProblemObject = req.body;
// //  xValueString: '123',
//   // yValueString: '123',
//   // operation: 'multiply',
//   // result: 15129 }
//
//     res.sendStatus(200);
//
// }); // closes / post

module.exports = router;
