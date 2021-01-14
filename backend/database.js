const mongoose = require("mongoose")
const schema = mongoose.Schema({
    currency: String,
    date: Date,
    open: Number,
    high: Number,
    low: Number,
    close:Number,
    volume:Number,
    market_cap:Number
  })
  const model = mongoose.model("crypto",schema)
  
 
  exports.model = model
  