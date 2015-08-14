'use strict';
angular.module('surfApp')
.factory('webSocket', function (socketFactory) {
      var socket = socketFactory();
      socket.forward('broadcast');
      return socket;
  });
