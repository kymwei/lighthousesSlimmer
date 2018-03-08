const request = require('request');
const querystring = require('querystring');
const splunkConfig = require('./config.splunk');

module.exports = class postToSplunk {
    constructor(data) {
        this.data = data;
        console.log(this.data);
    }

    postIt() {
        const postData = {
            time: (new Date).getTime(),
            index: "kbb_app",
            event: {
                cai_app: 'kbb lighthouse',
                ...this.data
            }
        };

        var request = require("request");
        //move authorization to differnt config
        var options = {
            method: 'POST',
            url: splunkConfig.splunkUrl,
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                Authorization: splunkConfig.Authorization
            },
            body: postData,
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });


    }
}