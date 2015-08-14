var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var fs = require('fs');
var io = require('socket.io')(http);

// set up our socket server
require('./socketIO/server_socketio')(io);

var mongoose = require('mongoose');

var port = 3000; //process.env.PORT ||
var vhost = 'nodejsapp.local';

var routes = require('./routes');
//var users = require('./routes/users');

var app = express();

var connection = require('./config/database')(mongoose);
var models = require('./models/models')(connection);

// optional - set socket.io logging level
  //io.set('log level', 1000);

  // view engine setup
  //app.set('views', path.join(__dirname, 'views'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.set('view options', {
    layout: false
  });

  app.engine('.html', require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  require('./routes/route.js')(app, models);
  //require('./routes/route.js')(app);

  app.get('/', routes.index);
  //app.post('/add/surfboard', routes.addSurfBoard);

  // redirect all others to the index (HTML5 history)
  app.get('*', routes.index);
  //app.post('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//development only
/*if (app.get('env') == 'development') {
  app.use(express.errorHandler());
}

if (app.get('env' == 'production')) {

}*/

//app.get('port')

/*var server = http.createServer(app).listen(8080, function() {
      console.log('Express server listening on port ' + vhost + ":" +server.address().port);
    }
);*/

var server = http.createServer(app);

io = io.listen(server);

server.listen(8080);

/*var options = {
   key:  fs.readFileSync('config/moxa.key'),
   cert: fs.readFileSync('config/moxa.crt'),
   ca:   fs.readFileSync('config/moxa.csr')
};

var httpsServer = https.createServer(options, app);
httpsServer.listen(8000); */


/*server.listen(8000, function() {
  console.log('Express server listening on port ' + vhost + ":" +server.address().port);
});*/

/*var server = https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
}).listen(8000);*/


module.exports = app;
