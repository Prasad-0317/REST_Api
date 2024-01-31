require("dotenv").config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const product_routes = require("./routes/products")
const connectDB = require("./db/connect")

app.get("/" , (req,res)=>{
    res.send("Hi , i am live");
});

// to set router
app.use("/api/products" , product_routes)

const start = async()=>{
    try {
    await connectDB(process.env.MONGODB_URL)
        app.listen(PORT , ()=>{
            console.log(`${PORT} is connected`)
        })
    } catch (error) {
        console.log(error);
    }
}
start();