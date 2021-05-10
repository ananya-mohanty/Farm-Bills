
var express         = require("express"),
router             = express(),
bodyParser      = require("body-parser"),
LocalStrategy   = require("passport-local"),
mongoose        = require('mongoose');
var passport = require("passport");

var router = express.Router();
var Bill = require('../models/bill');

router.get("/", function(req, res){

    
    Bill.find({}, function(err, allBills){
         if(err)
             console.log(err);
         else{
             res.render("./bills/bill", {bills: allBills});
         }
  
  
    });
     //res.render("campgrounds", {campgrounds: campgrounds});
  }); 
  
  router.get("/add", function(req, res){
  
    Bill.find({}, function(err, allBills){
         if(err)
             console.log(err);
         else{
             res.render("./bills/new", {bills:allBills});
         }
  
  
    });
    
  }); 
  
  router.post("/add", function(req, res){
   
    const bill = new Bill({
      _id: mongoose.Types.ObjectId(),
      recipient: req.body.recipient,
      land: req.body.land,
      description: req.body.description,
      date: req.body.date,
      amount: req.body.amount
    });
  
    bill
      .save()
      .then(result => {
        console.log(result);
        Bill.find({}, function(err, allBills){
          if(err)
              console.log(err);
          else{
              res.render("./bills/bill", {bills: allBills});
          }
   
   
     });
      })
      
  
     
  
  
  });
  
  router.post("/:id",function(req, res){
    
    Bill.findByIdAndRemove(req.params.id)
    .exec()
    .then(doc => {
      console.log(doc);
    })
    .catch(err => console.log(err));
    // res.render("");
  
    Bill.find({}, function(err, allBills){
      if(err)
          console.log(err);
      else{
          res.redirect("/bill");
      }
  
  
  });
  
  });
  
  
  router.get("/:id/edit", function(req, res){
  
    Bill.findById(req.params.id, function(err, foundBill){
  
             
              res.render("bills/edit", {bill: foundBill});
     });
  });
  //update
  router.put("/:id",function(req, res){
  
  Bill.findByIdAndUpdate(req.params.id, req.body.bill, function(err, updatedCampground){
     if(err)
     {
         console.log(err);
  
         res.redirect("/bill");
     }
     else{
         //res.send("EDITING");
         res.redirect("/bill/" + req.params.id);
     }
  });
  });
  
  
  module.exports = router;