var express = require('express');
var router = express.Router();

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
    master: master
  });
});

module.exports = router;