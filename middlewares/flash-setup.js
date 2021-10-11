//flash message setup
//getting flash message and storing every one of it in res.locals object property
const flashSetup = (req, res, next) => {
   res.locals.registeredMsg = req.flash("registeredMsg");
   res.locals.loginMsg = req.flash("loginMsg");
   res.locals.loggedoutMsg = req.flash("loggedoutMsg");
   res.locals.loggedinMsg = req.flash("loggedinMsg");
   next();
};

module.exports = {
   flashSetup,
};
