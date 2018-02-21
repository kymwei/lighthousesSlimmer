const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const perfConfig= require('./pref.json');
const config = require('./config');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
var getDirName = require('path').dirname;


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


var slimmerMatrix =  (r, page) => {
  const performanceMatrix = r.reportCategories.map(obj =>{ 
        var rObj = {};
        rObj =  {
          name: obj.name,
          id: obj.id,
          score: obj.score
        }
        return rObj;
     })
     return {
      matrix: performanceMatrix,
      url: r.url,
      pageName: page.pagename,
      generatedTime: r.generatedTime,
    };
}

console.log(config)
const UrlList = config.urlList;

async function asyncFuncs() {
  console.log('asyncFunc()');
  return 'abc';
}


var writeToFile = (slimmerResult) => {
  fs.writeFile(config.directory + '\\performanceMatrix'+ new Date().toISOString().split('T')[0] + '-1.json', JSON.stringify(slimmerResult), function (err) {
    if (err) {
      return console.log(err);
  }
  console.log("The file saved!");
  });
}
asyncFuncs().then( async (UrlList) => {
  let slimmerResult = [];
  for (let page of config.urlList) {
    let r = await launchChromeAndRunLighthouse(page.url, opts, perfConfig);
    let slimmer = slimmerMatrix(r, page);
    slimmerResult.push(slimmer);
  }
  return slimmerResult;
}).then(slimmerResult => {
  if(fs.existsSync(config.directory)){
    writeToFile(slimmerResult);
  }else{
    mkdirp(config.directory, function (err) {
      if (err) return cb(err);
      writeToFile(slimmerResult);
    });
  }

  console.log(slimmerResult);
}).catch(err => {
  console.log(err);
})
