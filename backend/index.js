const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({origin: 'http://localhost:3000'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/events', (req, res) => {
  let data = JSON.parse(fs.readFileSync('./data/events.json'));
  res.json(data);
})

app.get('/resources', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/resources.json'));
  const body = req.body;

  let result = [];
  // body && body.ids

  if (req.params) {
    for (let i = 0; i < req.params.id; i++) {
      result.push(data[i]);
    }
    // for (const id of req.params.id) {
    //   const found = findById(data, id);

    //   if (found) {
    //     result.push(found);
    //   }
    // }
  } 

  res.json(data);
})

function findById(array, id) {
  let result;

  for (const item of array) {
    if (item.id === id) {
      result = item;
      break;
    }
  }

  return result;
}

app.listen(port, () => console.log(`Listening http://localhost:${port}!`));