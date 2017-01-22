var express = require('express')
var router = express.Router()

var mathProblemObject = {};

router.get('/', function (req, res) {
// console.log(mathProblemObject, 'space');
// { xValue: '7.000001',
//   yValue: '14.00000000001',
//   operation: 'add',
//   result: 21.00000100001,
//   resultString: '7.000001 + 14.00000000001 = 21.00000100001' } 'space'
res.send(mathProblemObject); // this is the object with the data
}); // closes / get




// do all the math here
var result = 0;
var resultString = "";

router.post('/add', function (req, res) {
  result = parseFloat(req.body.xValue) + parseFloat(req.body.yValue);
  resultString = req.body.xValue + " + " + req.body.yValue + " = " + result;
  req.body.result = result; // adds result to req body
  req.body.resultString = resultString; // adds resultString to req body

  mathProblemObject = req.body;
  res.sendStatus(200);
});

router.post('/subtract', function (req, res) {
  result = req.body.xValue - req.body.yValue;
  resultString = req.body.xValue + " - " + req.body.yValue + " = " + result;
  req.body.result = result; // adds result to req body
  req.body.resultString = resultString; // adds resultString to req body

  mathProblemObject = req.body;
  res.sendStatus(200);
});

router.post('/multiply', function (req, res) {
  result = req.body.xValue * req.body.yValue;
  resultString = req.body.xValue + " &times; " + req.body.yValue + " = " + result;
  req.body.result = result; // adds result to req body
  req.body.resultString = resultString; // adds resultString to req body

  mathProblemObject = req.body;
  res.sendStatus(200);
});

router.post('/divide', function (req, res) {
  if (req.body.yValue == 0) {
    result = undefined;
    resultString = 'The Calculator cannot divide by zero.';
  } else {
    result = req.body.xValue / req.body.yValue
    resultString = req.body.xValue +  ' &divide; '  + req.body.yValue + " = " + result;
  };

  req.body.result = result; // adds result to req body
  req.body.resultString = resultString; // adds resultString to req body

  mathProblemObject = req.body;
  res.sendStatus(200);
});


router.post ('/squareRoot', function (req, res) {
    if (req.body.xValue < 0) {
      result = req.body.xValue;
      resultString = 'The Calculator cannot calculate a square root of a negative number. (' + req.body.xValue + ')';
    } else {
      result = Math.sqrt(req.body.xValue);
      resultString = '&radic;<span id="sqrRt" style="text-decoration: overline">&nbsp;' + req.body.xValue + '&nbsp;</span> = ' + result;
    };

    req.body.result = result; // adds result to req body
    req.body.resultString = resultString; // adds resultString to req body

    mathProblemObject = req.body;
    res.sendStatus(200);
});





// router.post('/', function (req, res) {
//   // console.log(req.body, 'requbody mathjs123');
// // { xValue: '123', yValue: '234', operation: 'subtract' } 'requbody mathjs123'
//
// // console.log('req.params333', req.params); // req.params333 {}
//
// switch (req.body.operation) {
//   case 'add':
//     result = parseFloat(req.body.xValue) + parseFloat(req.body.yValue);
//     resultString = req.body.xValue + " + " + req.body.yValue + " = " + result;
//     break;
//
//   case 'subtract':
//     result = req.body.xValue - req.body.yValue;
//     resultString = req.body.xValue + " - " + req.body.yValue + " = " + result;
//     break;
//
//   case 'multiply':
//     result = req.body.xValue * req.body.yValue;
//     resultString = req.body.xValue + " &times; " + req.body.yValue + " = " + result;
//     break;
//
//   case 'divide':
//     if (req.body.yValue == 0) {
//       result = undefined;
//       resultString = 'The Calculator cannot divide by zero.';
//     } else {
//       result = req.body.xValue / req.body.yValue
//       resultString = req.body.xValue +  '&divide;'  + req.body.yValue + " = " + result;
//     };
//     break;
//
//   case 'squareRoot':
//     if (req.body.xValue < 0) {
//       result = req.body.xValue;
//       resultString = 'The Calculator cannot calculate a square root of a negative number. (' + req.body.xValue + ')';
//     } else {
//       result = Math.sqrt(req.body.xValue);
//       resultString = '&radic;<span id="sqrRt" style="text-decoration: overline">&nbsp;' + req.body.xValue + '&nbsp;</span> = ' + result;
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
// //  xValue: '123',
//   // yValue: '123',
//   // operation: 'multiply',
//   // result: 15129 }
//
//     res.sendStatus(200);
//
// }); // closes / post

module.exports = router;
