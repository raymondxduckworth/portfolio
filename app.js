var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local");

var Campground  = require("./models/campground.js"),
    Comment     = require("./models/comment.js"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

// REQUIRING ROUTES
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes       = require("./routes/index");

// DATABASE CONFIGURATION
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "I like to move it, move it!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("The YelpCamp server has been initialized...");
});