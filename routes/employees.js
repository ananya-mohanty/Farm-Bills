
var express         = require("express"),
router             = express(),
bodyParser      = require("body-parser"),
LocalStrategy   = require("passport-local"),
mongoose        = require('mongoose');
var passport = require("passport");

var router = express.Router();
var Employee = require('../models/employee');

router.get("/", function(req, res){

    Employee.find({}, function(err, allEmployees){
         if(err)
             console.log(err);
         else{
             res.render("employees/index", {employees: allEmployees});
         }
  
  
    });
     //res.render("campgrounds", {campgrounds: campgrounds});
  }); 
  
  
  router.get("/add", function(req, res){
  
    Employee.find({}, function(err, allEmployees){
         if(err)
             console.log(err);
         else{
             res.render("employees/new", {employees: allEmployees});
         }
  
  
    });
     //res.render("campgrounds", {campgrounds: campgrounds});
  }); 
  
  router.post("/add", function(req, res){
   
    const employee = new Employee({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      salary: req.body.salary,
      date_of_joining: req.body.date_of_joining,
      description: req.body.description
    });
  
    employee
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  
    // res.redirect()
    // Campground.push(newCampground);
    res.redirect("/");
  });
  
  router.post("/:id",function(req, res){
    
    Employee.findByIdAndRemove(req.params.id)
    .exec()
    .then(doc => {
      console.log(doc);
    })
    .catch(err => console.log(err));
    // res.render("");
  
    Employee.find({}, function(err, allLands){
      if(err)
          console.log(err);
      else{
          res.redirect("");
      }
  
  
  });
  
  });

  module.exports = router;