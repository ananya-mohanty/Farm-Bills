const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const userSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String

});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema);
