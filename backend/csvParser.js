const fastcsv = require("fast-csv")
const fs  = require("fs")
const dbModel = require("./database")
const dbUrl = require("./config").DBURL
const mongoose = require("mongoose")


function parseCommaNumber(numStr){
    return numStr.replace(/,/g,"")
}
function parseDate(dateStr){
    return new Date(dateStr)
}
//connect to database
mongoose.connect(dbUrl)
mongoose.connection.once("open",()=>console.log("db connected"))
mongoose.connection.on("error",()=>console.log("connection failed"))

let stream = fs.createReadStream(__dirname + "/csv/crypto_historical_data.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push({
      currency: data[0],
      date: data[1],
      open: data[2],
      high: data[3],
      low: data[4],
      close:data[5],
      volume:data[6],
      market_cap:data[7]
    });
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();
    csvData.forEach(data=>{
        data.date = parseDate(data.date)
        data.open = parseCommaNumber(data.open)
        data.high = parseCommaNumber(data.high)
        data.low = parseCommaNumber(data.low)
        data.close = parseCommaNumber(data.close)
        data.volume = parseCommaNumber(data.volume)
        data.market_cap = parseCommaNumber(data.market_cap)
    })
    // insert into database
    dbModel.model.insertMany(csvData,(err,res)=>{
        if(err) console.log("error happened during inserting data",err)
        else{console.log("data inserting success!")}
        mongoose.connection.close()
    })
  });

stream.pipe(csvStream);
