//calling express
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    LocalStrategy   = require("passport-local"),
    mongoose        = require('mongoose');
var passport = require("passport");

var router = express.Router();
var Land = require('./models/land');
var Bill = require('./models/bill');
var Worker = require('./models/worker');
var Wage =  require('./models/wage');
const User = require("./models/user");

app.set("view engine", "ejs");
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect(
  "mongodb+srv://jita:ananya@cluster0.ag8vc.mongodb.net/test?authSource=admin&replicaSet=atlas-am764a-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
  { useMongoClient: true }
);

// add public direct
app.use(express.static(__dirname + "/public"));

//MAIN code goes here

app.get("/", (req, res) => {
  res.render("./homepage");
});

//User Section //


app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  // var newUser = new User({username: req.body.username});
  // console.log(newUser.username);

  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password
  });

  user
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

    passport.authenticate("local")(req, res, function(err){
      console.log(err);
      // req.flash("success", "Welcome to Farm Bills, " + user.username);
      console.log("success", "Welcome to Farm Bills, " + user.username);
      res.redirect("/");
  });

});

// app.get("/user/:id", (req, res, next) => {
//   console.log()
//   User.findById(req.params.id)
//     .exec()
//     .then(doc => {
//       console.log(doc);
//     })
//     .catch(err => console.log(err));

//   res.send("hi");
// });


//LANDS
app.get("/land", function(req, res){

  Land.find({}, function(err, allLands){
       if(err)
           console.log(err);
       else{
           res.render("./lands/index", {lands: allLands});
       }


  });
   //res.render("campgrounds", {campgrounds: campgrounds});
}); 


app.get("/land/add", function(req, res){

  Land.find({}, function(err, allLands){
       if(err)
           console.log(err);
       else{
           res.render("./lands/new", {lands: allLands});
       }


  });
   //res.render("campgrounds", {campgrounds: campgrounds});
}); 

app.post("/land/add", function(req, res){
 
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

app.post("/land/:id",function(req, res){
  
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

app.get("/bill", function(req, res){

  Bill.find({}, function(err, allBills){
       if(err)
           console.log(err);
       else{
           res.render("./bills/bill", {bills: allBills});
       }


  });
   //res.render("campgrounds", {campgrounds: campgrounds});
}); 

app.get("/bill/add", function(req, res){

  Bill.find({}, function(err, allBills){
       if(err)
           console.log(err);
       else{
           res.render("./bills/new", {bills:allBills});
       }


  });
  
}); 

app.post("/bill/add", function(req, res){
 
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

app.post("/bill/:id",function(req, res){
  
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


app.get("/bill/:id/edit", function(req, res){

  Bill.findById(req.params.id, function(err, foundBill){

           
            res.render("bills/edit", {bill: foundBill});
   });
});
//update
app.put("/bill/:id",function(req, res){

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



// WORKER
app.get("/employee", function(req, res){

  Worker.find({}, function(err, allWorkers){
       if(err)
           console.log(err);
       else{
           res.render("./workers/index", {workers: allWorkers});
       }


  });
   //res.render("campgrounds", {campgrounds: campgrounds});
}); 


app.get("/employee/add", function(req, res){

  Worker.find({}, function(err, allWorkers){
       if(err)
           console.log(err);
       else{
           res.render("./workers/new", {workers: allWorkers});
       }


  });
   //res.render("campgrounds", {campgrounds: campgrounds});
}); 

app.post("/employee/add", function(req, res){
 
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
  res.redirect("/employee");
});

app.post("/employee/:id",function(req, res){
  
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
        res.redirect("/employee");
    }


});

});

// DAILY WAGE UPDATE

// app.get("/employee", function(req, res){

//   Worker.find({}, function(err, allWorkers){
//        if(err)
//            console.log(err);
//        else{
//            res.render("./workers/index", {workers: allWorkers});
//        }


//   });
//    //res.render("campgrounds", {campgrounds: campgrounds});
// }); 


app.get("/wage/add", function(req, res){

  Worker.find({}, function(err, allWorkers){
       if(err)
           console.log(err);
       else{
           res.render("./wages/new", {workers: allWorkers});
       }


  });
   //res.render("campgrounds", {campgrounds: campgrounds});
}); 

app.post("/wage/add", function(req, res){
 
var size= req.body.name.length;
console.log(req.body.attendance);
var i;
for( i=0; i<size; i++){
  const wage = new Wage({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name[i],
    amount: req.body.wage[i],
    description: req.body.description[i],
    attendance: req.body.attendance[i],
    date: req.body.date[i]
  });

  
  wage
  .save()
  .then(result => {
    console.log(result);
  }); 

}
});

app.post("/wage/:id",function(req, res){
  
  Wage.findByIdAndRemove(req.params.id)
  .exec()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => console.log(err));
  // res.render("");

  Wage.find({}, function(err, allWages){
    if(err)
        console.log(err);
    else{
        res.render("./wages/index", {wages: allWages});
    }


});

});


app.get("/wage", (req, res) => {
  Wage.find({}, function(err, allWages){
    if(err)
        console.log(err);
    else{
        res.render("./wages/index", {wages: allWages});
    }


});
});

//add port to listen-default 3000
app.listen(process.env.PORT||3003, function(){
  console.log("The Server has started");
});

//Listen port
app.listen(app.get("port"), function() {
  console.log("express started " + app.get("port"));
});
