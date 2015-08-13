module.exports = function (models) {

    var User = models.user;
    var Accessory = models.accessory;
    var Surfboard = models.surfboard;
    //var Surfboard = require('../models/surfboard.js');

    /*var AWS = require('aws-sdk');
    AWS.config.loadFromPath('./config/config.json');

    var sqs = new AWS.SQS();

    sqs.addPermission(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
        }

    });*/

    return {

        createSurfboard: function(req, res) {
            var board_name = req.body.boardname;
            var board_type = req.body.boardtype;
            var board_length = req.body.boardlength;

            var boardData = {
                name: board_name,
                type: board_type,
                length: board_length
            };

            var board = new Surfboard(boardData);
            board.save(function (err) {
                if (err)
                    throw err;

                console.log('add ' + board_name + 'type is ' + board_type + ' successfully');
                res.send("add " + board_name + "type is " + board_type + " successfully");
            });
        },

        updateSurfBoard: function (req, res) {

            Surfboard.update( {name: 'test'}, { name:'awesome board', type: 'fishboard', length: '5incch8'}, { multi: true}, function(err, raw) {
                if (err) return handleError(err);
                console.log('The raw response from Mongo was ', raw);
            });

        },

        publishMessage: function(req, res) {

            var client  = mqtt.connect('mqtt://192.168.127.68');

            client.on('connect', function () {
                //client.subscribe('presence');
                client.publish('mxview', 'Hello mxview');
            });

            client.on('message', function (topic, message) {
                // message is Buffer
                console.log(message.toString());
                client.end();
            });
        },

        subscribeMessage: function(req, res) {

            var client  = mqtt.connect('mqtt://ec2-52-3-105-64.compute-1.amazonaws.com');

            client.on('connect', function () {
                var mqtopic = require('./mqTopic.js');
                var topicObject = new mqtopic();

                client.subscribe(topicObject.getRegisterMXviewTopic());
            });

            client.on('message', function (topic, message) {
                // message is Buffer
                console.log(message.toString());
                client.end();
            });

            client.on('disconnect', function(packet) {
                console.log('mqtt client is disconnected');
            });

            client.on('close', function(packet) {
                console.log('mqtt client is closed');
            });

            client.on('error', function(packet) {
                console.log('mqtt client occurs error');
            });
        }

    }
}