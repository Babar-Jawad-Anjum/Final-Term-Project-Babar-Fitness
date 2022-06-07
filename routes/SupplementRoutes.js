var express = require('express');
var router = express.Router();
var {Supplements} = require('../Models/Supplements');
var validateSupplement = require("../middlewares/validateSuppliment");
var checkSessionAuth = require("../middlewares/checkSessionAuth");

/* GET supplement page. */
router.get('/', async function(req, res) 
{
  let supplement = await Supplements.find();
  res.render('Supplements/ListSupplement' ,{supplement});
});
/* get supplement data for update */
router.get('/edit/:id', async function(req, res) 
{
  let supplement = await Supplements.findById(req.params.id);
  return res.render("Supplements/EditSupplement", {supplement});
});
/* update supplement data. */
router.post('/edit/:id', validateSupplement,  async function(req, res) 
{
  let supplement = await Supplements.findById(req.params.id);
  supplement.Name= req.body.Name;
  supplement.Price= req.body.Price;
  supplement.Servings= req.body.Servings;
  supplement.Discount= req.body.Discount;
  await supplement.save();
  return res.redirect("/supplement");

});
router.get('/add', async function(req, res) 
{
  res.render("Supplements/AddNewSupplement");
});
router.post('/add', validateSupplement,  async function(req, res) 
{
  let supplement = new Supplements(req.body);
  await supplement.save();
  return res.redirect("/supplement");

});
//delete supplement
router.get('/delete/:id', async function(req, res) 
{
  await Supplements.findByIdAndDelete(req.params.id);
  res.redirect("/supplement");
});




// cart handle
/* add supplement to cookies. checkSessionAuth will check user is logged in or not. */
router.get('/cart/:id', checkSessionAuth,  async function(req, res) 
{
  let supplement = await Supplements.findById(req.params.id);
  let cart = [];
  if(req.cookies.cart) cart = req.cookies.cart;
  cart.push(supplement);
  res.cookie("cart", cart);
  res.redirect("/supplement");
});
//remove cart product
router.get('/cart/remove/:id', async function(req, res, next) {
  let cart = [];
  if(req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id), 1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});

module.exports = router;
