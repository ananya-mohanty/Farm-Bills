
var express         = require("express"),
router             = express(),
bodyParser      = require("body-parser"),
LocalStrategy   = require("passport-local"),
mongoose        = require('mongoose');
var passport = require("passport");

var router = express.Router();
var Employee = require('../models/employee');

router.get("/", function(req, res){

    Worker.find({}, function(err, allWorkers){
         if(err)
             console.log(err);
         else{
             res.render("workers/index", {workers: allWorkers});
         }
  
  
    });
     //res.render("campgrounds", {campgrounds: campgrounds});
  }); 
  
  
  router.get("/add", function(req, res){
  
    Worker.find({}, function(err, allWorkers){
         if(err)
             console.log(err);
         else{
             res.render("workers/new", {workers: allWorkers});
         }
  
  
    });
     //res.render("campgrounds", {campgrounds: campgrounds});
  }); 
  
  router.post("/add", function(req, res){
   
    const worker = new Worker({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      wage: req.body.wage,
      description: req.body.description
    });
  
    worker
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  
    // res.redirect()
    // Campground.push(newCampground);
    res.redirect("");
  });
  
  router.post("/:id",function(req, res){
    
    Worker.findByIdAndRemove(req.params.id)
    .exec()
    .then(doc => {
      console.log(doc);
    })
    .catch(err => console.log(err));
    // res.render("");
  
    Worker.find({}, function(err, allLands){
      if(err)
          console.log(err);
      else{
          res.redirect("");
      }
  
  
  });
  
  });

  module.exports = router;