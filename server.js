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
var landRoutes = require("./routes/lands");
var billRoutes = require("./routes/bills");
var workerRoutes = require("./routes/workers");
var employeeRoutes = require("./routes/employees");
const worker = require("./models/worker");

app.set("view engine", "ejs");


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
app.use("/land", landRoutes);
app.use("/bill", billRoutes);
app.use("/worker", workerRoutes);
app.use("/employee", employeeRoutes);
// app.use(express.static(__dirname + "/public"));
//add port to listen-default 3000
app.listen(process.env.PORT||8000, function(){
  console.log("The Server has started");
});

//Listen port
app.listen(app.get("port"), function() {
  console.log("express started " + app.get("port"));
});
