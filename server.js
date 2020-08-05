var express = require("express");
var hbs = require("hbs");
var path = require("path");
var methodOverride = require("method-override");
var session = require("express-session");
require("./db");

// Routes of both API as well as normal
var todoAPIRoutes = require("./routes/apiRoutes/todoApiRoutes");
var userAPIRoutes = require("./routes/apiRoutes/userApiRoutes");
var todoNormalRoutes = require("./routes/normalRoutes/todoNormalRoutes");

// Init
var app = express();

// Setting HBS as template engine


// Registering hbs partials

// Having user form body parsed
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Adding custom request type override query key name
//jwt
// Adding the session capabilities
//cors
const PORT = process.env.PORT || 8000
app.use(
  session({
    secret: "todosAPIexpressappsecret",
    resave: false,
    name: "todoSession",    //cookies users jwtt algoith + 
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    }
  })
);

app.use(todoNormalRoutes);
app.use(userAPIRoutes);
app.use(todoAPIRoutes);

app.get("/", function(req, res) {
  return res.json({
    title: "Home page",
    userId: req.session.userId
  });
});

app.listen(PORT, function() {
  console.log("Server started");
});
