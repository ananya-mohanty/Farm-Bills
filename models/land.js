const mongoose = require("mongoose");

const landSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String,
    description: String
  
  });
  
  module.exports = mongoose.model("land", landSchema);
  