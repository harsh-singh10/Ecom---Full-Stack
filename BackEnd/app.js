const PORT = 4000
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")

const cors = require("cors");

// multer 
 const upload = require("./middleware/multer.middleware")

// Product schema 
const Product = require("./models/product.model.js")


// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Server is on!");
});


// creating Upload Endpoint for images 

const uploadDirectory = path.join(__dirname, 'upload', 'temp');

 // Middleware to serve static files from the uploadDirectory
 app.use('/images', express.static(uploadDirectory));


app.post("/upload" , upload.single('product') , (req,res)=>{

 res.json({
    success:1,
    image_url:`http://localhost:${PORT}/images/${req.file.filename}`
  })
  
})



// add product 

app.post('/addproduct' , async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find({});
    let gId;

    if (products.length > 0) {
      // If there are existing products, generate the new ID based on the last product's ID
      const lastProduct = products[products.length - 1];
      gId = lastProduct.id + 1;
    } else {
      // If there are no existing products, start with ID 1
      gId = 1;
    }

    const { name, new_price, old_price, image, category } = req.body;

    // Create the new product
    const product = await Product.create({
      name,
      id: gId,
      new_price,
      old_price,
      image,
      category,
    });

    console.log(product);

    res.status(200).json({
      success: true,
      message: "Data saved",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
});



// delete a product

app.post('/removeproduct', async (req, res) => {
  try {
    const {id } = req.body
    await Product.findOneAndDelete(id);
    console.log("Product deleted successfully");
    res.status(200).json({
      success: true,
      message: "Product removed",
      name: req.body.name
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove product"
    });
  }
});



// api for getting all products 

app.get("/allproduct" , async(req,res)=>{
  try {
    const allproduct = await Product.find({});
    console.log("all products feched");
    // res.send(allproduct)
    res.status(200).json({
      success:true,
      data:allproduct,
      message:"data feched"
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      message:"error while fecheing data"
    })
  }
})



// User modellll  

const User = require('./models/user.model.js')

// creating end point for registering users  

app.post('/signup', async(req,res)=>{

  const check = await User.findOne({email:req.body.email})

  if(check){
    return res.status(400).json({success:false , message:"already exists email"})
  }

  let cart = {}

  for(let i =0;i<300 ;i++){
    cart[i] = 0;
  }

  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    cartData:req.body.cart
  })

  await user.save();

  const data = {
    user:{
       id:user.id
    }
  }

  const token = jwt.sign(data , 'secret_ecom')

  res.json({success:true, token})

})


// for log in 

app.post('/login' , async(req,res)=>{
    
 let user = await User.findOne({email:req.body.email})
 
 if(user){
  const passCompare = req.body.password === user.password

    if(passCompare){
      const data = {
        user:{
           id:user.id
        }
      }
    
      const token = jwt.sign(data , 'secret_ecom')
    
      res.json({success:true, token})

    }
    else{
      res.json({success:false, message:"wrong password"})
    }
 }
 else{
  res.json({success:false , message:"wrong email id "})
 }



})


module.exports = app;