module.exports = function (models) {

    var https = require('https');
    var Agent = require('agentkeepalive');
    //var gateway = require('./gateway_push.js');
    var webAPI = require('./web_api.js');
    var hashcode_tag = 'Hash=';

    return {

        getMXviewData: function (req, res) {


            var loginoptions = {
                host: '192.168.127.68',
                port: 443,
                path: '/goform/account/?uid=admin&pwd=&action=login',
                headers: {'accept': '*/*'},
                rejectUnauthorized: false,
                requestCert: true,
                agent: false,
                method: 'GET'
            };

            var hashCode = '';

            var ret = https.request(loginoptions, function(res) {
                console.log('STATUS:' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    console.log('BODY: ' + chunk);
                    var arr = chunk.split(";");
                    hashCode = arr[0].substring(arr[0].indexOf(">") +1, arr[0].length);
                    console.log('hashcode='+hashCode);
                    if(hashCode.indexOf(hashcode_tag) > -1) {
                        webAPI.getMXview_License(hashCode);
                        //gateway.getDynamicUpdateFromMXview(hashCode);
                    }
                });
            });

            ret.on('error', function (e) {
                console.log('problem with request: ' + e.message);
            });

            //res.send("push successfully");

            ret.end();

            //res.send("push successfully");
        }
    }
}