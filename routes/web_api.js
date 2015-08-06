var https = require('https');
var License_Tag = "License_Str";
var xmlParser = require('xml2js').parseString;
var mqtopic = require('./mqTopic.js');
var nodeCache = require('node-cache');
var webAPI_Cache = new nodeCache( {stdTTL:60000, checkperiod:120});
var http_module = require('./http_module.js');
var web_api_url = require('./web_API_URL.js');

var topicObj = new mqtopic();
var web_url = new web_api_url();


module.exports = {

    web_api_getlink_summary: function(req, res) {
      console.log('link summary');
        console.log('req parameter1 =' + req.query.action);
        console.log('req parameter2 =' + req.query.user_name);
        console.log('req parameter3 =' + req.query.password);
        var result = webAPI_Cache.get('link_summary', function(err, value){
           if(value == undefined){
               console.log('result is undefine');
           }else {
               console.log(value);
               res.send(value);

           }
        });
    },

    web_api_getdevice_summary: function(req, res) {
        console.log('link summary');
        console.log('req parameter1 =' + req.query.action);
        console.log('req parameter2 =' + req.query.user_name);
        console.log('req parameter3 =' + req.query.password);
        var result = webAPI_Cache.get('device_summary', function(err, value){
            if(value == undefined){
                console.log('result is undefine');
            }else {
                console.log(value);
                res.send(value);

            }
        });
    },

    getlink_summary: function(serverip) {
       var options = {
           host: '192.168.127.68',
           port: 443,
           path: '/goform/link?action=severity_summary&user_name=admin&password=',
           headers: {'accept':'*/*'},
           rejectUnauthorized: false,
           requestCert: true,
           agent: false,
           method: 'GET'
       };

        var ret = https.request(options, function(res) {
            console.log('STATUS:' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                var mqtt_client = require('./mqtt_client.js')('192.168.127.68');
                webAPI_Cache.set('link_summary', chunk, function(err, success) {
                        console.log(success);
                    }
                );
                console.log('BODY: ' + chunk);

                mqtt_client.publish(topicObj.getMXviewDashbaordTopic(), chunk);
            });
        });

        ret.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        ret.end();

    },

    getdevice_summary: function (server_ip, hashcode) {
        var options = {
            host: '192.168.127.68',
            port: 443,
            path: '/goform/device?action=severity_summary&user_name=admin&password=',
            headers: {'accept':'*/*'},
            rejectUnauthorized: false,
            requestCert: true,
            agent: false,
            method: 'GET'
        };


        /*var ret = https.request(options, function(res) {
            console.log('STATUS:' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                var mqtt_client = require('./mqtt_client.js')('192.168.127.68');
                console.log('BODY: ' + chunk);
                webAPI_Cache.set('device_summary', chunk, function(err, success) {
                        console.log(success);
                    }
                );

                console.log('BODY: ' + chunk);
                var topicObj = new mqtopic();
                mqtt_client.publish(topicObj.getMXviewDashbaordTopic(), chunk);
            });
        });

        ret.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        ret.end(); */

    },

    getMXview_License: function (hashcode) {

        var getlicense_options = {
            host: '192.168.127.68',
            port: 443,
            path: '/goform/license?action=get',
            headers: {'accept': '*/*'},
            rejectUnauthorized: false,
            requestCert: true,
            agent: false,
            method: 'GET',
            headers: {'Cookie': hashcode}
        };

        function start_sending_mqtt(license_data) {
            if(license_data.indexOf(License_Tag) > -1) {
                var mqtt_client = require('./mqtt_client.js')('192.168.127.13');
                console.log('json result');
                xmlParser(license_data, function(err, result) {
                    var license_result = JSON.stringify(result);

                    var register_data = {
                        "servername": "MXview 1",
                        "license": result.License.Item[0][License_Tag]
                    };
                    mqtt_client.publish(topicObj.getRegisterMXviewTopic(), JSON.stringify(register_data));

                    console.log('license='+ result.License.Item[0][License_Tag]);
                    console.log(license_result);
                    console.log('Done');

                });
            }
        }

        http_module.httpsRequest('192.168.127.68', 443, web_url.getLicenseURL(), 'GET', hashcode, start_sending_mqtt);

        /*var ret = https.request(getlicense_options, function(res) {
            console.log('STATUS:' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                console.log('BODY: ' + chunk);
                if(chunk.indexOf(License_Tag) > -1) {
                    var mqtt_client = require('./mqtt_client.js')('192.168.127.13');
                    console.log('json result');
                    xmlParser(chunk, function(err, result) {
                        var license_result = JSON.stringify(result);
                        var topicObj = new mqtopic();

                        var register_data = {
                            "servername": "MXview 1",
                            "license": result.License.Item[0][License_Tag]
                        };
                        mqtt_client.publish(topicObj.getRegisterMXviewTopic(), JSON.stringify(register_data));

                        console.log('license='+ result.License.Item[0][License_Tag]);
                        console.log(license_result);
                        console.log('Done');

                    });
                }
            });

            res.on('end', function() {
                console.log('http request ended!');
            });

        });

        ret.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        ret.end();*/

        //res.send("push successfully");
    }
}