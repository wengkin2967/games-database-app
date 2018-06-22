var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

// // jQuery Set up
// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;
// var $ = require("jquery")(window);

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

// Create Route
app.post("/games", function(req,res){
    req.body.game.body = req.sanitize(req.body.game.body);
    Game.create(req.body.game, function(err,newGame){
        if(err){
            res.redirect("/games");
        }
        else{
            res.redirect("/games");
        }
    });
});

// Show Route
app.get("/games/:id", function(req,res){
    Game.findById(req.params.id, function(err, game){
        if(err){
            res.redirect("/games");
        }
        else{
            res.render("show", {game: game});
        }
    })
});

// Edit Route
app.get("/games/:id/edit", function(req,res){
    Game.findById(req.params.id, function(err,game){
        if(err){
            res.redirect("/games/:id");
        }
        else{
            res.render("edit", {game: game});
        }
    })
})

// Update Route
app.put("/games/:id",function(req,res){
    Game.findByIdAndUpdate(req.params.id, req.body.game, function(err, updatedGame){
        if(err){
            res.redirect("/games");
        }
        else{
            res.redirect("/games/" + req.params.id);
        }
    });
});

app.delete("/games/:id", function(req,res){
    Game.findByIdAndRemove(req.params.id, function(err,updateGame){
        if(err){
            res.redirect("/games");
        }
        else{
            res.redirect("/games");
        }
    })
})

app.listen(3000, function(){
    console.log("Games Database has started");
});
