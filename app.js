var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

// jQuery Set up
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

// App Config
mongoose.connect("mongodb://localhost/game-database-app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


// Mongoose/Model Config
var gameSchema = new mongoose.Schema({
  title: String,
  image: String,
  publisher: String,
  released: Date,
  body: String,
  created: {type: Date, default: Date.now}
});

var Game = mongoose.model("Game", gameSchema);

app.get("/", function(req,res){
    res.redirect("/games");
});

// Index Route
app.get("/games", function(req,res){
    Game.find({}, function(err,games){
        if(err){
            alert("Cannot find games");
        }
        else{
            res.render("index", {games:games});
        }
    })
})

// New Route
app.get("/games/new", function(req,res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("Games Database has started");
});
