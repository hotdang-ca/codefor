const Papa = require('papaparse');
const express = require('express');
const os = require("os");
const axios = require('axios');
const pug = require('pug');
const DEFAULT_URL = 'http://codefor.ca/wp-content/uploads/2017/06/dev-challenge-data.csv';

let cachedParsedData = undefined;
let cachedAnalysis = {};

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

/* initialize the app, fetching data */
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
};

/* Analyze data by incident type */
const analyzeType = (type) => {
  const analyzeStartTime = Date.now();

  if (!cachedParsedData) {
    return {};
  }

  if (cachedAnalysis[type]) {
    return cachedAnalysis[type];
  }

  let incidentCount = 0;
  let earliestIncident = 0;
  let lastIncident = 0;

  cachedParsedData.forEach((incident) => {
    if (incident.violation_type === type) {
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
    incidentCount: incidentCount,
    earliestIncident: earliestIncidentAsISO,
    latestIncident: lastIncidentAsISO
  };

  cachedAnalysis[type] = results;
  return cachedAnalysis[type];
};

/*
  Path to view the page.
 */
app.get('/', (req, res) => {
  if (cachedParsedData) {
    res.render('index', { data: cachedParsedData });
  } else {
    res.render('404');
  };
});

/*
  Path to fetch the cached analysis data.
  This data will change as the front-end user
  continues to analyze unique incident types.
 */
app.get('/api/analyze/all', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(cachedAnalysis);
});

/*
  Path to fetch the analysis of an incident type.
  If it is already cached, that is returned, otherwise
  the analysis is conducted, cached, and returned.
 */
app.get('/api/analyze/:type', (req, res, next) => {
  const type = req.params.type;

  if (cachedAnalysis[type]) {
    res.setHeader('Content-Type', 'application/json');
    console.log(`Returned cached analytis for ${type}`);
    res.send(cachedAnalysis[type]);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send(analyzeType(type));
  }
  // res.send(`${incidentCount} incidents of that type. Earliest on ${earliestIncidentAsISO}, last on ${lastIncidentAsISO}. Analysis took ${timeDifferenceInMillis}ms`);
});

/*
  Path to fetch the raw incident data.
 */
app.get('/api/rawdata', (req, res, next) => {
  if (!cachedParsedData) {
    res.setHeader('Content-Type', 'application/json');
    res.send({});
    next();
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(cachedParsedData);
});

/* Time to start! */
init(process.argv.slice(2)[0] || DEFAULT_URL).then((response) => {
  cachedParsedData = response.data;
  // analyze all

  const analyzeStartTime = Date.now();
  console.log('Starting analysis...');
  response.data.forEach((incident) => {
    if (! cachedAnalysis[incident.violation_type]) {
      analyzeType(incident.violation_type);
    }
  });
  const analyzeDuration = (Date.now() - analyzeStartTime);
  console.log(`Completed analysis in ${analyzeDuration}ms`);

  const PORT = (process.env.PORT || 3000);
  app.listen(PORT, () => {
    console.log(`${process.argv.slice(2)[0] ? 'Custom' : 'Default' } data cached and example app listening on port 3000!`);
    console.log('');
    console.log('Paths:');
    console.log(`  http://${os.hostname()}:${PORT}/ - the front-end app.`);
    console.log(`  http://${os.hostname()}:${PORT}/api/rawdata - JSON output of the raw data`);
    console.log(`  http://${os.hostname()}:${PORT}/api/analyze/<type> - JSON output of analysis for specified type`);
    console.log(`  http://${os.hostname()}:${PORT}/api/analyze/all - JSON output of cached analysis`);
  });
}).catch((error) => {
  console.log(error);
});
