const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./database");
const { validatePassword } = require("../utilities/password-utils.js");

const verifyCb = async (email, password, done) => {
   try {
      const user = await User.findOne({ email });
      if (!user) {
         done(null, false, {
            message: "User with the given email id not found!!",
         });
      } else if (!validatePassword(password, user.hash, user.salt)) {
         done(null, false, { message: "Wrong password" });
      } else if (validatePassword(password, user.hash, user.salt)) {
         done(null, user, { message: "You Have Succssfully Logged In" });
      }
   } catch (err) {
      done(err);
   }
};

passport.use(new localStrategy({ usernameField: "email" }, verifyCb));

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
   const user = await User.findById(id);
   done(null, user);
});
