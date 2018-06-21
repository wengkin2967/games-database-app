var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

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
  released: {type: Date, default: Date.now},
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Game", gameSchema);

app.get("/", function(req,res){
    res.redirect("/games");
});

// Index Route
app.get("/games", function(req,res){
    res.render("index");
})

app.listen(3000, function(){
    console.log("Games Database has started");
});
