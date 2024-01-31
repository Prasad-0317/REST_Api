const mongoose = require("mongoose")
const { options } = require("../routes/products")
var mongo = require('mongodb');


const connectDB = (uri)=>{
    mongoose.set('strictQuery', false);
    // console.log("connect db");
    return mongoose.connect(uri, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}

module.exports = connectDB