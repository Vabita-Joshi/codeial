function authenticationMiddleware () {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/')
    }
  }
  module.exports.setFlash = function(req,res,next){
    res.locals.flash={
      'success': req.flash('success'),
      'error': req.flash('error')
    }
    next();
  }