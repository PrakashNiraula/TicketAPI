var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const ticketRouter=require('./routes/ticket')
const vehicleRouter=require('./routes/vehicle');
const routeRouter=require('./routes/route');
const scheduleRouter=require('./routes/schedule');
const uploadRouter=require("./routes/upload");
const auth=require('./auth/auth');
const cors = require('cors')





const connect=mongoose.connect(process.env.DB_URI,{useNewUrlParser:true ,useUnifiedTopology: true});

connect.then((db)=>{
  console.log(`server listening at localhost:3000`);
},(err)=>{
  console.log(err);
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/ticket',auth.verifyUser,ticketRouter);
app.use('/vehicle',auth.verifyUser,vehicleRouter);
app.use('/schedule',auth.verifyUser,scheduleRouter);
app.use('/route',auth.verifyUser,routeRouter);
app.use('/upload',auth.verifyUser,uploadRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
