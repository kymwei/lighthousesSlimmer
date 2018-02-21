const fs = require('fs');
const path = require('path');


module.exports = {
    urlList : [
      {url: 'http://kbb.com', pagename: 'homepage'},
      {url: 'https://www.kbb.com/new-cars/', pagename: 'nchome'},
      {url: 'https://www.kbb.com/whats-my-car-worth/', pagename: 'carworthhome'},
      {url: 'https://www.kbb.com/toyota/camry/2017/le/?vehicleid=419859&intent=buy-new#survey', pagename: 'ymmtrimnewovr_buynew'},
      {url: 'https://www.kbb.com/bmw/3-series/2011/328i-sedan-4d/?vehicleid=352597&intent=trade-in-sell&mileage=89320&pricetype=trade-in&options=6373600|true&condition=excellent', pagename: 'ymmtrimtisellovr_selltrade'}
     ],
    // urlList : [
    //   {url: 'https://example.com', pagename: 'homepage'},
    // //  {url: 'https://www.kbb.com/new-cars/', pagename: 'newcar'}
    // ],
    directory: 'output',
    directoryExists : (filePath) => {
      try {
        return fs.statSync(filePath).isDirectory();
      } catch (err) {
        return false;
      }
    }
  };