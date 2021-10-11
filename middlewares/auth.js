const isAuthenticated = (req, res, next) => {
   if (req.isAuthenticated()) {
      next();
   } else {
      req.flash("loginMsg", "Please Login To View The Resouce");
      res.redirect("/login");
   }
};

const isNotAuthenticated = (req, res, next) => {
   if (!req.isAuthenticated()) {
      next();
   } else {
      req.flash(
         "loggedinMsg",
         "You Are Already Logged In Logout to Register/Login."
      );
      res.redirect("/");
   }
};

module.exports = {
   isAuthenticated,
   isNotAuthenticated,
};
