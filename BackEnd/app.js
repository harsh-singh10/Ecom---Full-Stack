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





module.exports = app;