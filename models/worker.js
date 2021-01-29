const mongoose = require("mongoose");

const workerSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    wage: Number,
    description: String
  
  });
  
  module.exports = mongoose.model("worker", workerSchema);
  