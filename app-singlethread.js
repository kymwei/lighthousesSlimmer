const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const perfConfig= require('./pref.json');
const config = require('./config');
const fs = require('fs');


function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results =>
      chrome.kill().then(() => results));
  });
}

const opts = {
  chromeFlags: ['--show-paint-rects']
};

// Usage:
launchChromeAndRunLighthouse('https://example.com', opts, perfConfig).then(results => {
  const performanceMatrix = results.reportCategories.map(obj =>{ 
    var rObj = {};
    rObj =  {
      name: obj.name,
      id: obj.id,
      score: obj.score
    }
    return rObj;
 })
 const performanceMatrixLog = {
  matrix: performanceMatrix,
  url: 'http://www.kbb.com',
  pageName: 'homepage',
  timestamp: Date.now()
}
 console.log(performanceMatrixLog);
 fs.writeFile('performanceMatrix.json', JSON.stringify(performanceMatrixLog), function (err) {
   if (err) {
       return console.log(err);
   }

   console.log("The file was saved!");
 });
});