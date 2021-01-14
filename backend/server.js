const express = require("express")
const db = require("./database")
const dbUrl = require("./config").DBURL
const mongoose = require("mongoose")
const cors = require("cors")


const app = express()


function getCurrencySet(document){
    currency = document.map(item=>item.currency)
    return new Set(currency)
}

app.use(cors())
app.get("/types",async (req,res)=>{
    let document = await db.model.find()
    currencies = Array.from(getCurrencySet(document))
    res.status(200).json({data:currencies})
})
app.get("/crypto/:name",async (req,res)=>{
    data = await db.model.find({currency:req.params.name}).sort({date:-1}).limit(30)
    if(data.length === 0 ) res.status(404).json({err:"crypto not found"})
    else res.status(200).json({data})
})

//connect to database
mongoose.connect(dbUrl)
mongoose.connection.once("open",()=>{
    console.log("database connected")
    app.listen(3001,()=>{console.log("server running")})
})
mongoose.connection.on("error",()=>console.log("connection failed"))

module.exports = app