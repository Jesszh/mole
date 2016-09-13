var express = require('express');
var router = express.Router();
var passport = require('passport');
var filter = require('../lib/filter');

router.get('/', function(req, res) {
    res.redirect('/');
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('passport/login', { message: req.flash('loginMessage') });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/admin/list', // redirect to the secure profile section
  failureRedirect : '/passport/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


// // =====================================
// // SIGNUP ==============================
// // =====================================
// // show the signup form
// router.get('/signup', function(req, res) {
//
//     // render the page and pass in any flash data if it exists
//     res.render('passport/signup', { message: req.flash('signupMessage') });
// });
//
// // process the signup form
// router.post('/signup', passport.authenticate('local-signup', {
//     successRedirect : '/admin/list', // redirect to the secure profile section
//     failureRedirect : '/passport/signup', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// }));

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
