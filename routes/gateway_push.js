
module.exports = {

    getDynamicUpdateFromMXview: function(hashcode) {

        var http = require('http');
        var Agent = require('agentkeepalive');
        var mqtt    = require('mqtt');
        var xmlParser = require('xml2js').parseString;
        var xmlStart_String = "Trigger_Detail";

        var client  = mqtt.connect('mqtt://192.168.127.68');
        var mqttConnectSuccess = 0;

        client.on('connect', function () {
            console.log('mqtt connected');
            mqttConnectSuccess = 1;
        });

        var keepaliveAgent = new Agent({
            maxSocket: 100,
            maxFreeSockets:10,
            timeout: 180000,
            keepAliveTimeout: 180000
        });

        var options = {
            host: '192.168.127.68',
            port: 8080,
            path: '/goform/trigger',
            method: 'GET',
            headers: {'Cookie': hashcode},
            agent: keepaliveAgent
        };

        var req = http.request(options, function(res) {
            console.log('STATUS:' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                console.log('BODY: ' + chunk);
                //chunk.setEncoding('utf8');
                if(chunk.indexOf(xmlStart_String) > -1) {
                    console.log('json result');
                    xmlParser(chunk, function(err, result) {
                        console.log(JSON.stringify(result));
                        console.log('Done');
                    });
                }

                if(mqttConnectSuccess == 1)
                {
                    client.publish('mxview', chunk);
                }
            });
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();

        setTimeout(function() {
            console.log('keep alive sockets:');
            //console.log(keepaliveAgent.unusedSockets);
        }, 2000);
    }
}