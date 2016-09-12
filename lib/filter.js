/**
 * Created by Jess on 9/12/16.
 */

// route middleware to make sure a user is logged in
exports.isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/passport/login');
};
