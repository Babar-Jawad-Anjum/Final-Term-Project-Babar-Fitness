var express = require('express');
var router = express.Router();
var {Admin} = require("../Models/admin");
var {User} = require('../Models/Users');
var validateAdmin = require("../middlewares/validateAdminLogin");

/* GET login page*/
router.get('/adminLogin', function(req, res, next) {
  res.render('admin/AdminLogin');
});
/* login*/
router.post('/adminLogin', validateAdmin, async function(req, res, next) {
  let admin = await Admin.findOne({Email: req.body.Email});
  if(!admin) return res.status(400).send("Admin credentials not found"); //if !exists return.
  let adminPass = await Admin.findOne({Password: req.body.Password});
  if(!adminPass) return res.status(400).send("Incorrect Password"); //if !exists return.

  // maintains session for admin
  req.session.admin = admin;
  return res.redirect('/');

});

/* logout*/
router.get('/adminLogout', function(req, res, next) {
  req.session.admin = null;
  res.redirect('/admin/adminLogin');
});

router.get('/users', async function(req, res) 
{
  let users = await User.find();
  res.render('admin/listUsers' ,{users});
});
module.exports = router;


