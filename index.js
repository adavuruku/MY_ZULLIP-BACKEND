const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/books",{useNewUrlParser:true},(error)=>{
    if(!error){console.log("connected");}else{ console.log("connected");
    }
})