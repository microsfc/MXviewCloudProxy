require('angular');
require('smart-table');
require('../service/socket.js');

var app = angular.module('surfApp');


app.controller('MainController', ['$scope', '$http', 'socketio', function($scope, $http, socketio) {
    $scope.title = 'This Month\'s Bestsellers';
    $scope.promo = "The most popular surfboard this month";


    var MXviewSiteName = ['Site1','Site2','Site3'];
    var devicedown = [3,2,1];
    var criticalEvent = [10,5,1];
    var warningEvent = [3,5,1];
    var id = 0;

    //chatSocket.connect('http://localhost:8080');

    socketio.on('connect', function(){
        $scope.title = 'connected';
    });

    socketio.on('user connected', function(msg){
        $scope.promo = msg;
    });

    socketio.on('mxviewcloud dashbaord', function(msg){
        $scope.promo = msg;
    });

    //socket.on('chat message', function(msg){
      //  $('#messages').append($('<li>').text(msg));
    //});

    function generateItem(id) {
        var sitename = MXviewSiteName[id];
        var devicedownCount = devicedown[id];
        var criticalEventCount = criticalEvent[id];
        var warningEventCount = warningEvent[id];

        return {
            id: id,
            sitename: sitename,
            devicedown: devicedownCount,
            criticalEvent: criticalEventCount,
            warningEvent: warningEventCount
        }
    }

    $scope.rowCollection = [];

    for(id; id<3; id++) {
        $scope.rowCollection.push(generateItem(id));
    }

    $scope.displayedCollection = [].concat($scope.rowCollection);

    $scope.addItem = function addItem() {
        $scope.rowCollection.push(generateItem(id));
    }

    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if(index != -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        var newWidth = 600 + slides.length+1;
        slides.push({
           image: 'http://placekitten.com/' + newWidth + '/300',
           text: ['More', 'Extra', 'Losts of', 'Surplus'][slides.length %4] + '' +
               ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length %4]
        });
    };

    for (var i= 0; i<4; i++) {
        $scope.addSlide();
    }

    $scope.add_surfboard = function () {
        console.log("result=" + $scope.board_name);
        var req = {
            method: 'POST',
            url: '/add/surfboard',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: { boardname: $scope.board_name, boardtype: 'short board', boardlength:' 6 inch 6' }
        }

        $http(req)
            .success(function(data, status, headers, config) {
                console.log('post successfully');
            }).error(function(data, status, headers, config) {
                console.log('repnose is ' + data);
            });
    }

}]);