const express = require("express");
const passport = require("passport");
const {
   genPassword,
   validatePassword,
} = require("../utilities/password-utils.js");
const {
   isAuthenticated,
   isNotAuthenticated,
} = require("../middlewares/auth.js");

//importing user model
const User = require("../config/database.js");

const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {
   res.render("index", {
      title: "Home",
      name: req.user.name,
   });
});

router.get("/protected-route", isAuthenticated, (req, res) => {
   res.render("protected-route", {
      title: "Protected Route",
      name: req.user.name,
      email: req.user.email,
   });
});

router.get("/register", isNotAuthenticated, (req, res) => {
   res.render("register", { title: "Register" });
});

router.get("/login", isNotAuthenticated, (req, res) => {
   res.render("login", { title: "Login" });
});

router.get("/logout", isAuthenticated, (req, res) => {
   req.logout();
   req.flash("loggedoutMsg", "You Have Successfully Logged Out");
   res.redirect("/login");
});

router.post("/register", async (req, res) => {
   const { name, email, password1, password2 } = req.body;
   let errors = [];
   if (!name || !email || !password1 || !password2) {
      errors.push({ error: "Fill all the fields" });
   }
   if (await User.findOne({ email })) {
      errors.push({
         error: "User with same email ID already exists try again with another email id",
      });
   }
   if (password1 !== password2) {
      errors.push({ error: "Passwords dosen't match" });
   }
   if (!errors.length) {
      const { hash, salt } = genPassword(password1);
      if (hash && salt) {
         const newUser = new User({
            name,
            email,
            hash,
            salt,
         });
         try {
            await newUser.save();
            req.flash(
               "registeredMsg",
               "You have successfully registered and can now login."
            );
            res.redirect("/login");
         } catch (err) {
            errors.push({
               error: "Some error occured, couldn't register please try again",
            });
         }
      } else {
         errors = {
            error: "Some error occured, couldn't register please try again",
         };
      }
   }
   if (errors.length) {
      const renderObj = {
         title: "Register",
         name,
         email,
         password1,
         password2,
         messages: {
            errors,
         },
      };
      res.render("register", renderObj);
   }
});

router.post(
   "/login",
   passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: true,
   })
);

module.exports = router;
