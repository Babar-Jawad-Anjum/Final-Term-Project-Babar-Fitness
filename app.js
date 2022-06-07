var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionAuth = require('./middlewares/sessionAuth');
var logger = require('morgan');
var mongoose = require('mongoose');

var HomeRoutes = require('./routes/HomeRoutes');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var supplementRouter = require('./routes/SupplementRoutes');

var app = express();
app.use(session({
  secret : 'keybiard cat',
  resave :false,
  saveUninitialized: true,
  cookie : {maxAge:60000}      
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(sessionAuth);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', HomeRoutes);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/supplement', supplementRouter);

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
// database connection
const url = `mongodb+srv://BabarJawad:UawWvf1V6YAVRqWF@cluster0.v5rvh.mongodb.net/Babar-Fitness-Zone-Db?retryWrites=true&w=majority`;
mongoose.connect(url, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
.then(() =>
{
    console.log("Connected to database");
})
.catch((err) => 
{
    console.log(err.message);
});
module.exports = app;
