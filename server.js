//REQUIRED
var express = require("express");
var methodOverride = require("method-override");
var db = require("./models")
var app = express();

//MIDDLEWARE
// Configure app
app.set("view engine", "ejs");
// Tells Express that everything that is not html is located here
app.use(express.static(__dirname + "/static"))
app.use(express.urlencoded({extended: false}));
// Telling app (express) to use methodOverride. it takes attribute you put in the form
app.use(methodOverride("_method"));

// Get route to root
app.get("/", function(req, res) {
    res.render("index");
});

// GET /games - gets all games
//get route to games collection
//because it's get, you know it's an index action
// The route at the top shows on the url
app.get("/games", function(req, res) { 
    // Try and get all records from the database, if this succeeds, it'll give us data for the callback
    db.game.findAll().then(function(games) {
    // Find data within data object
    console.log(games);
    // res.render data into ejs page (Response function is render)
    // The route below shows where you'll find the "page" in your directory
    res.render("games/index", {games});
    });
});


// Delivers form. Needs to go above "show one page" action for it to work.
app.get("/games/new", function(req, res) {
    res.render("games/new");
});

// Submits Form
app.post("/games", function(req, res) {
    db.game.findOrCreate({
        where: {
            name: req.body.name,
            description: req.body.description
        },
        defaults: {players: parseInt(req.body.players)}
    }).spread(function(game, created) {
        console.log(game);
        res.redirect("/games")
    })
});


// Delete
app.delete("/games/:id", function(req, res) {
    db.game.destroy({
        where: { id: req.params.id }
    }).then(function() {
        res.redirect("/games")
    });
});


// GET /games/3/edit - returns the populated edit form
// Edit: Sending out the edit form
app.get("/games/:id/edit", function(req, res) {
    db.game.findById(parseInt(req.params.id)).then(function(game) {
        res.render("games/edit", {game})//second parameter is an object 
        
    })
});

// POSTS the edits
app.put("/games/:id", function(req, res) {
    db.game.update({
        name: req.body.name,
        description: req.body.description,
        players: parseInt(req.body.players)
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect("/games/" + parseInt(req.params.id));
    }).catch(function(err) {
        res.send(err.errors[0].message);
    });
});



// GET /games/3 - gets one game
//shows one page
// Had to place it below new page code, because it wouldn't work when placed above
app.get("/games/:id", function(req, res) {
    console.log("Hitting games with id")
    db.game.findById(parseInt(req.params.id)).then(function(game) {
        res.render("games/show", {game});
    });
});




app.listen(3000);