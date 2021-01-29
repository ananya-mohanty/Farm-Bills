const mongoose = require("mongoose");

const billSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    recipient: String,
    land: String,
    description: String,
    amount: Number,
    date: String
    
    
  });
  
  module.exports = mongoose.model("bill", billSchema);
  