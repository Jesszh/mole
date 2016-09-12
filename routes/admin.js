/**
 * Created by Jess on 9/12/16.
 */
var express = require('express');
var router = express.Router();
var short = require("../lib/short");
var filter = require('../lib/filter');
var logger = require('morgan');

/* GET home page. */
router.get('/list', filter.isAuthenticated, function(req, res, next) {


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

router.get('/create', filter.isAuthenticated, function(req, res, nest) {
  var url = req.query.url;

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

router.get('/update', filter.isAuthenticated, function (req,res,next) {
  var url = req.query.url,
    hash  = req.query.hash;

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

module.exports = router;


function formatResult(outcome,message,data){
  return {
    "Outcome"	: outcome,
    "Message"	: message,
    "Data"		: data
  }
}
