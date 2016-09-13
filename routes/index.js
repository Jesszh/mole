var express = require('express');
var router = express.Router();
var short = require("../lib/short");
var logger = require('morgan');

router.get('/', function(req, res, next) {
  res.redirect('http://bbae.com');
});

router.get('/:hash', function(req, res, next) {
	var hash = req.params.hash;

	short.retrieve(hash).then(function(result) {
			res.redirect(result.URL);
	  }, function(error) {
	    if (error) {
	    	console.log(error);
	    	res.status(404);
	    }
	  });
});

module.exports = router;
