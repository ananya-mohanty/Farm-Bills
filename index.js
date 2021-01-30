//calling express
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require('mongoose');

var router = express.Router();
var Land = require('./models/land');
var Bill = require('./models/bill');
var Worker = require('./models/worker');
var Wage =  require('./models/wage');
// //handle bars with section
// var handlebars = require("express3-handlebars").create({
//   defaultLayout: "main",
//   helpers: {
//     section: function(name, options) {
//       if (!this._sections) this._sections = {};
//       this._sections[name] = options.fn(this);
//       return null;
//     }
//   }
// });

//mongoose.connect("mongodb://localhost:27017/yelpcamp");
// app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

const User = require("./models/user");

app.get("/user/add", (req, res) => {
  res.render("adduser");
});

app.post("/user/add", (req, res) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    password: req.body.password
  });

  user
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.send("DOne");
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

  res.send("DOne");
  // Campground.push(newCampground);
  // res.redirect("/campgrounds");
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

  res.send("Done");
  // Campground.push(newCampground);
  // res.redirect("/campgrounds");
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
console.log(size);
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
  })
  .catch(err => console.log(err));



  

  

}
  // const bill = new Bill({
  //   _id: mongoose.Types.ObjectId(),
  //   recipient: req.body.name[i],
  //   amount: req.body.wage,
  //   description: req.body.description,
  //   land: "Daily Wage"
  // });

  
  // bill
  // .save()
  // .then(result => {
  //   console.log(result);
  // })
  // .catch(err => console.log(err));



  

  
  // Campground.push(newCampground);
  // res.redirect("/campgrounds");
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
app.listen(process.env.PORT||3012, function(){
  console.log("The Server has started");
});

//Listen port
app.listen(app.get("port"), function() {
  console.log("express started " + app.get("port"));
});
