const Papa = require('papaparse');
const express = require('express');
const axios = require('axios');
const pug = require('pug');
const DATA_URL = 'http://codefor.ca/wp-content/uploads/2017/06/dev-challenge-data.csv';

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

function getData(data) {
  return new Promise(function(resolve, reject) {
    axios.get(DATA_URL).then( function(response) {
      Papa.parse(response.data, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          resolve(results);
        }
      });
    }).catch(function(error) {
      reject(error);
    });
  });
}

app.get('/', function (req, res) {
  const parsedData = getData(DATA_URL).then((response) => {
    res.render('index', { data: response.data });
  }).catch((error) => {
    res.send(error);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
