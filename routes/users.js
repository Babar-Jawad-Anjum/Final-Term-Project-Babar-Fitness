var express = require('express');
var router = express.Router();
var {User} = require("../Models/Users");
var validateLoginUser = require("../middlewares/validateUserLogin");
var validateRegistration = require("../middlewares/validateUserReg");
var bcrypt = require('bcryptjs');

/* GET login page*/
router.get('/login', function(req, res, next) {
  res.render('Users/UserLogin');
});
/* login*/
router.post('/login', validateLoginUser, async function(req, res, next) {
  let user = await User.findOne({Email: req.body.Email});
  if(!user) return res.status(400).send("User not regsitered"); //if !exists return.

  // check user enters correct password or not
  let isValidUser = await bcrypt.compare(req.body.Password, user.Password);
  if(!isValidUser) return res.status(401).send("Invalid Password");
  req.session.user = user;
  return res.redirect('/');

});

/* logout*/
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/users/login');
});

/* GET register page*/
router.get('/register', function(req, res, next) {
  res.render('Users/UserRegister');
});
//post user data for registration
router.post('/register',validateRegistration, async function(req, res, next) {
  // check if user already exists or not
  let user = await User.findOne({Email: req.body.Email});
  if(user) return res.status(400).send("User with given Email already exists"); //if exists return.

  // else save user into db
  user = new User();
  user.Name = req.body.Name;
  user.Email = req.body.Email;
  user.Password = req.body.Password;

  // for password encryption
  let salt = await bcrypt.genSalt(10);
  user.Password = await bcrypt.hash(user.Password, salt);
  await user.save();
  res.redirect("/");
});



module.exports = router;
