var express = require('express');
var router = express.Router();
var products = require('../data/products.json');


var master = {
  title:"Access"
};

/* GET home page. */
router.get('/', function(req, res) {

  //Just passing data through to views
  res.render('home', { 
    page: 'Home',
    master: master
  });
});

/* GET catalog page. */
router.get('/catalog', function(req, res) {

  //Just passing data through to views
  res.render('ecommerce/catalog', { 
    page: 'Catalog',
    master: master,
    products: products
  });
});

/* GET products json. */
router.get('/api/products', function(req, res) {
  res.send(JSON.stringify(products));
});

module.exports = router;