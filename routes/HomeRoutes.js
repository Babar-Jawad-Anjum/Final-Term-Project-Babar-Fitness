var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) 
{
  res.render('Home');
});

/* GET About page. */
router.get('/about', function(req, res) 
{
  res.render('About');
});

/* GET Gellery page. */
router.get('/gellery', function(req, res) 
{
  res.render('Gellery');
});

router.get('/cart', function(req, res, next) {
  let cart = req.cookies.cart;
  if(!cart) cart = [];
  console.log(cart);
  res.render('listcartitems' , { cart });
});
module.exports = router;
