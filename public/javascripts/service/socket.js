'use strict';
//require('../lib/socket.io-client/socket.io.js');
//require('../lib/angular-socket-io/socket.js');
require('angular-socket-io');

angular.module('surfApp')
.factory('socketio', function (socketFactory) {
      var socket = socketFactory();
      socket.forward('broadcast');
      return socket;
  });
