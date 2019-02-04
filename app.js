
/*app.get('/usershistory/:id',(req,res)=>{
  const user=profiles.find(c=> c.id === parseInt(req.params.id))
  if(!user)
      res.status(404).send('user not found');
      res.send(user)
})*/



var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
var app = express();
var details=[
  {
    id:1,
    name: "abcdes",
    email:"khjsjk@jnsks.ij",
    password:"gsfghd"},
    {id:2,
      name: "abcdes",
      email:"dggbdb@jnsks.ij",
      password:"dhuyhd"},
    {id:3,
      name: "dhbdnj",
      email:"hdbhjb@jnsks.ij",
      password:"pass"},
  ]

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/submit/user',function(req,res,next){
  res.send(details);
});
app.get('/submit/',function(req,res,next){
  var user = details.find(c=> c.id === details.length)
  res.send(user);
});
app.get('/submit/user/:id',(req,res)=>{
  const user=details.find(c=> c.id === parseInt(req.params.id))
  if(!user)
      res.status(404).send('user not found');
  else
      res.send(user)
})
app.post('/submit/',function(req,res,next){ 
  
 var user={
   id: details.length+1,   
   name:req.body.name,
   email:req.body.email,
   password: req.body.password
 }
 details.push(user);
 res.send(user);
});
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
