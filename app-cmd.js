const { exec } = require('child_process');
const fs = require('fs');
const config = require('./config');



exec('lighthouse https://google.com --output=json',  {maxBuffer: 1024 * 1000}, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log(err)
    return;
  }
  const jsonData = JSON.parse(stdout);

  const performanceMatrix = jsonData.reportCategories.map(obj =>{ 
    var rObj = {};
    rObj =  {
      name: obj.name,
      id: obj.id,
      score: obj.score
    }
    return rObj;
 })
 // performanceMatrix = jsonData.reportCategories;
 const performanceMatrixLog = {
   matrix: performanceMatrix,
   url: 'http://www.kbb.com',
   pageName: 'homepage',
   timestamp: Date.now()
 }
  console.log(performanceMatrixLog);
  fs.writeFile('performanceMatrix.json', JSON.stringify(performanceMatrix), function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  });
});
