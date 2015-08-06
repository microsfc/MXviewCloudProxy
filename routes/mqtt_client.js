
module.exports = function(broker_ip){

    var module = {};
    var mqtt    = require('mqtt');

    var client  = mqtt.connect('mqtt://' + broker_ip); //192.168.127.68'
    var g_topic = "";
    var g_message = "";

    client.on('connect', function () {
        console.log('mqtt connected');
        client.publish(g_topic, g_message);
    });

    client.on('disconnect', function(packet) {
        console.log('mqtt client is disconnected');
    });

    client.on('close', function(packet) {
        console.log('mqtt client is closed');
        client.end();
    });

    client.on('error', function(packet) {
        console.log('mqtt client occurs error');
    });

    module.publish = function(topic, message) {
        g_topic = topic;
        g_message = message;
    };

    module.subscribe = function(topic) {

    };

    return module;
}