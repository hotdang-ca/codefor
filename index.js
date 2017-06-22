const Papa = require('papaparse');
const express = require('express');
const axios = require('axios');
const pug = require('pug');
const DEFAULT_URL = 'http://codefor.ca/wp-content/uploads/2017/06/dev-challenge-data.csv';

let cachedParsedData = undefined;

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

const init = (dataUrl) => {
  return new Promise(function(resolve, reject) {
    axios.get(dataUrl).then( function(response) {
      Papa.parse(response.data, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          resolve(results);
        }
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

app.get('/', (req, res) => {
  if (cachedParsedData) {
    res.render('index', { data: cachedParsedData });
  } else {
    res.render('404');
  };
});

app.get('/api/analyze/:type', (req, res) => {
  const analyzeStartTime = Date.now();

  if (!cachedParsedData) {
    res.send('No data to analyze.');
  }

  let incidentCount = 0;
  let earliestIncident = 0;
  let lastIncident = 0;

  cachedParsedData.forEach((incident) => {
    if (incident.violation_type === req.params.type) {
      const dateTimestamp = Date.parse(incident.violation_date);

      if (earliestIncident === 0) {
        earliestIncident = dateTimestamp;
      } else if (dateTimestamp < earliestIncident) {
        earliestIncident = dateTimestamp;
      }

      if (dateTimestamp > lastIncident) {
        lastIncident = dateTimestamp;
      }

      incidentCount += 1;
    }
  });

  // cleanup
  const earliestIncidentAsISO = new Date(earliestIncident).toISOString();
  const lastIncidentAsISO = new Date(lastIncident).toISOString();

  const analyzeEndTime = Date.now();
  const timeDifferenceInMillis = analyzeEndTime - analyzeStartTime;

  // prepare output
  const results = {
    incidentType: req.params.type,
    incidentCount: incidentCount,
    earliestIncident: earliestIncidentAsISO,
    latestIncident: lastIncidentAsISO
  };
  res.setHeader('Content-Type', 'application/json');
  res.send(results);
  // res.send(`${incidentCount} incidents of that type. Earliest on ${earliestIncidentAsISO}, last on ${lastIncidentAsISO}. Analysis took ${timeDifferenceInMillis}ms`);
});

app.get('/api/rawdata', (req, res) => {
  if (!cachedParsedData) {
    res.setHeader('Content-Type', 'application/json');
    res.send({});
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(cachedParsedData);
});

init(process.argv.slice(2)[0] || DEFAULT_URL).then((response) => {
  cachedParsedData = response.data;
  app.listen(3000, () => {
    console.log(`${process.argv.slice(2)[0] ? 'Custom' : 'Default' } data cached and example app listening on port 3000!`);
  });
}).catch((error) => {
  console.log(`Error getting data from URL specified: ${DATA_URL}`);
})
