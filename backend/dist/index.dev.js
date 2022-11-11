"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var fs = require('fs');

var cors = require('cors');

var app = express();
var port = 5000;
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/events', function (req, res) {
  var data = JSON.parse(fs.readFileSync('./data/events.json'));
  res.json(data);
});
app.get('/resources', function (req, res) {
  var data = JSON.parse(fs.readFileSync('./data/resources.json'));
  var body = req.body;
  var result = []; // body && body.ids

  if (req.params) {
    for (var i = 0; i < req.params.id; i++) {
      result.push(data[i]);
    } // for (const id of req.params.id) {
    //   const found = findById(data, id);
    //   if (found) {
    //     result.push(found);
    //   }
    // }

  }

  res.json(data);
});

function findById(array, id) {
  var result;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item.id === id) {
        result = item;
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

app.listen(port, function () {
  return console.log("Listening http://localhost:".concat(port, "!"));
});