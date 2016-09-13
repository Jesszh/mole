/**
 * Created by Jess on 9/12/16.
 */
var express = require('express');
var router = express.Router();
var short = require("../lib/short");
var filter = require('../lib/filter');
var logger = require('morgan');

router.get('/', function(req, res) {
  res.redirect('/');
});

/* GET home page. */
router.get('/list', filter.isAuthenticated, function(req, res, next) {

  var listURLsPromise = short.list();

  listURLsPromise.then(function(list) {
    res.render('admin/list',{'list':list});

  }, function(error) {
    if (error) {
      throw new Error(error);
    }
  });

});

router.get('/edit', filter.isAuthenticated, function(req, res, nest) {
  var hash = req.query.hash;

  if(hash == undefined){
    res.render('admin/edit');
  }else{

    short.retrieve(hash).then(function(result) {
      res.render('admin/edit',{'model':result});
    }, function(error) {
      if (error) {
        console.log(error);
        res.status(404);
      }
    });
  }

});

router.post('/edit', filter.isAuthenticated, function(req, res, nest) {
  var url = req.body.URL;
  var hash = req.body.hash;

  if(hash == '') {
    // promise to generate a shortened URL.
    short.generate({
      URL: url
    }).then(function (mongodbDoc) {
      short.retrieve(mongodbDoc.hash).then(function (result) {
        res.redirect('/admin/list');
      }, function (error) {
        if (error) {
          throw new Error(error);
        }
      });
    }, function (error) {
      if (error) {
        throw new Error(error);
      }
    });
  }else{
    short.update(hash,{
      URL: url
    }).then(function (result) {
      res.redirect('/admin/list');
    },function (error) {
      if (error) {
        throw new Error(error);
      }
    })
  }
});

module.exports = router;
