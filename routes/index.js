var express = require('express');
var router = express.Router();
var short = require("short");

var mongodbConnection = 'mongodb://localhost/short';

function formatResult(outcome,message,data){
  return {
    "Outcome"	: outcome,
    "Message"	: message,
    "Data"		: data
  }

}


/* GET home page. */
router.get('/admin/list', function(req, res, next) {
  // connect to mongodb
  short.connect(mongodbConnection);
  short.connection.on('error', function(error) {
    throw new Error(error);
  });

  // promise to retrieve all shortened URLs
  listURLsPromise = short.list();

  // output all resulting shortened url db docs
  listURLsPromise.then(function(URLsDocument) {

    res.send(formatResult("Success","操作成功",URLsDocument));

  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });

});

router.get('/admin/create', function(req, res, nest) {
  var url = req.query.url;
  // connect to mongodb
  short.connect(mongodbConnection);
  short.connection.on('error', function(error) {
    throw new Error(error);
  });

  // promise to generate a shortened URL.
  var shortURLPromise = short.generate({
    URL : url
  });

  // gets back the short url document, and then retrieves it
  shortURLPromise.then(function(mongodbDoc) {
    short.retrieve(mongodbDoc.hash).then(function(result) {
      res.send(formatResult("Success","操作成功",result));
    }, function(error) {
      if (error) {
        throw new Error(error);
      }
    });
  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });
});

router.get('/admin/update', function (req,res,next) {
  var url = req.query.url,
      hash  = req.query.hash;

  short.connect(mongodbConnection);
  short.connection.on('error', function(error) {
    throw new Error(error);
  });

  short.update(hash,{
    URL: url
  }).then(function (result) {
    res.send(formatResult("Success","操作成功",result));
  },function (error) {
    if (error) {
      throw new Error(error);
    }
  })
});

router.get('/:hash', function(req, res, next) {
	var hash = req.params.hash;
  console.log(hash);
	short.connect(mongodbConnection);
	short.connection.on('error', function(error) {
	  throw new Error(error);
	});
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
