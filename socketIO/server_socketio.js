module.exports = function (io) {
  'use strict';
  var webapi = require('../routes/web_api.js');

  io.on('connection', function (socket) {
    socket.emit('mxviewcloud dashbaord', webapi.get_MXviewRegisterData());

    socket.on('message', function (from, msg) {

      console.log('recieved message from', from, 'msg', JSON.stringify(msg));

      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      });
      console.log('broadcast complete');
    });
  });
};

