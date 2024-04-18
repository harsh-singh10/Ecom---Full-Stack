const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
      type:String ,  
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object
        
    },
   



},{timestamps:true})


const User = mongoose.model('User' , userSchema);

module.exports = User