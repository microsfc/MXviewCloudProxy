require('angular');

require('ui_bootstrap');
require('ui_bootstrap_carousel');

angular.module('surfApp',['ui.bootstrap', 'ui.bootstrap.carousel', 'btford.socket-io']);

require('./controllers/MainController.js');

//var app = angular.module("surfApp",[]);