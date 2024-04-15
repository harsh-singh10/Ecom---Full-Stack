const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    
    new_price:{
        type:String,
        required:true
    },
    old_price:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    avilable:{
        type:Boolean,
        default:true
    }


},{timestamps:true})

const Product = mongoose.model("Product",productSchema);

module.exports = Product