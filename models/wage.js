const mongoose = require("mongoose");

const wageSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    attendance: String,
    description: String,
    amount: Number,
    date: String
    
    
  });
  
  module.exports = mongoose.model("wage", wageSchema);
  