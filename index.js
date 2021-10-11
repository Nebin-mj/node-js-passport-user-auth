//environment variable config
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const PORT = process.env.PORT || 5000;

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const hbs = require("express-handlebars");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const { flashSetup } = require("./middlewares/flash-setup.js");

//initilizing express app
const app = express();
const routes = require("./routes/index.js");

app.use(express.urlencoded({ extended: false })); //to get query params data from request in js objct format
app.use(express.json()); // to get body form the request in javascript object format

app.engine(".hbs", hbs({ extname: ".hbs" })); //setting ext name from default .handlebars to .hbs
app.set("view engine", ".hbs"); //setting view engine

//mongostore to store sessions into the database under collection name 'sessions'
const sessionStore = new MongoStore({
   mongoUrl: process.env.mongoUrl,
   collectionName: "sessions",
});
//session setup middleware
app.use(
   session({
      secret: process.env.sessionSecret,
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
         maxAge: 1000 * 60 * 60 * 24,
         httpOnly: true,
      },
   })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.js");

//initializing flash middleware
app.use(flash());

//flash message setup
//getting flash message and storing every one of it in res.locals object property
app.use(flashSetup);

app.use(routes);

app.listen(PORT, () => {
   console.log(`!!Server Running On PORT:${PORT}!!`);
});
