const Product = require("../models/product")

const getAllProducts = async(req,res)=>{
    const {company,name,featured,sort} = req.query
    console.log(req.query);
    const queryObj = {}
    if(company){
        queryObj.company = company
    }
    if(featured){
        queryObj.featured = featured
    }
    if(name){
        queryObj.name = {$regex:name , $options:"i"}
    }

    let apidata = Product.find(queryObj)

    if(sort){
        let sortFix = sort.replace(","," ")
        apidata = apidata.sort(sortFix)
    }
    console.log(queryObj);
    const myData = await apidata
    res.status(200).json({myData})
}
const getAllProductsTesting = async(req,res)=>{
    const myData = await Product.find(req.query).sort("price")
    res.status(200).json({myData})
}

module.exports = {getAllProducts,getAllProductsTesting}

