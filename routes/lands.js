var express         = require("express"),
    router             = express(),
    bodyParser      = require("body-parser"),
    LocalStrategy   = require("passport-local"),
    mongoose        = require('mongoose');
var passport = require("passport");

var router = express.Router();
var Land = require('../models/land');


router.get("/", function(req, res){

    console.log('hello')
    Land.find({}, function(err, allLands){
         if(err)
             console.log(err);
         else{
             res.render("./lands/index", {lands: allLands});
         }
  
  
    });
     //res.render("campgrounds", {campgrounds: campgrounds});
  }); 



router.get("/add", function(req, res){

    Land.find({}, function(err, allLands){
         if(err)
             console.log(err);
         else{
             res.render("lands/new");
         }
  
  
    });
     //res.render("campgrounds", {campgrounds: campgrounds});
  }); 
  
  router.post("/add", function(req, res){
   
    const land = new Land({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      location: req.body.location,
      description: req.body.description
    });
  
    land
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  
      res.redirect("/land");
    
  });
  
  router.post("/:id",function(req, res){
    
    Land.findByIdAndRemove(req.params.id)
    .exec()
    .then(doc => {
      console.log(doc);
    })
    .catch(err => console.log(err));
    // res.render("");
  
    Land.find({}, function(err, allLands){
      if(err)
          console.log(err);
      else{
          res.redirect("/land");
      }
  
  
  });
  
  });
  router.put('/land/:id', function(req, res) {
      // create mongose method to update a existing record into collection
      let id = req.params.id;
      var data = {
      name: req.body.name,
      location: req.body.location,
      description: req.body.description
      }
   
      // save the user
      Land.findByIdAndUpdate(id, data, function(err, land) {
      if (err) throw err;
   
      res.send('Successfully! Land updated - '+land.name);
      });
  });
  

  module.exports = router;