var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var app = express();
app.set('env', 'development');

var config = require('./config/' + app.get('env'));
app.set('port', config.port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'vJfmXwRecfs08B3kHiIpmsAc0M' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', require('./routes/index') );
app.use('/admin', require('./routes/admin'));
app.use('/passport', require('./routes/passport'));

require('./config/passport')(passport);

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
      status: err.status,
      stack: err.stack
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    status: err.status,
    stack: null
  });
});

process.on('uncaughtException', function (err) {
  console.log(err);
});

module.exports = app;

mongoose.connect(config.mongodb,function (err) {
  if(err != undefined){
    console.log(err);
  }
});

// 启动及端口
http.createServer(app).listen(app.get('port'), function(){
  console.log(app.get('env'));
  console.log('Express server listening on port ' + app.get('port'));
});
