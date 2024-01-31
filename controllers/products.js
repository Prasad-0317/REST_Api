const Product = require("../models/product")

const getAllProducts = async(req,res)=>{
    const {company,name,featured,sort,select} = req.query
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
        let sortFix = sort.split(",").join(" ")
        apidata = apidata.sort(sortFix)
        // queryObj.sort = sortFix
    }
    if(select){
        // let selectFix = select.replace(","," ")  --> gives incorrect when three op 
        let selectFix = select.split(",").join(" ")
        apidata = apidata.select(selectFix)
        // queryObj.sort = sortFix
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page-1)*limit
    apidata = apidata.skip(skip).limit(limit)

    console.log(queryObj);
    // const myData = await Product.find(queryObj).sort(sort) --> not working
    const Products = await apidata
    res.status(200).json({Products ,nbHits:Products.length})
}
const getAllProductsTesting = async(req,res)=>{
    // const myData = await Product.find(req.query).sort("-price")
    const myData = await Product.find(req.query).skip(2)
    res.status(200).json({myData , nbHits:myData.length})
}

module.exports = {getAllProducts,getAllProductsTesting}

