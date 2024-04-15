
// const Product = require("./../models/product.model.js")

// // upload file 

// const uploadFile = async(req,res)=>{

//     try {
//         res.json({
//           success: 1,
//           image_url: `http://localhost:${PORT}/images/${req.file.filename}`
//         });
//       } catch (error) {
//         console.error("Error uploading file:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload file",
//         });
//       }

// }










// add product 

const addProduct = async (req, res) => {


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
    } 
    catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add product",
        });
    }
}

module.exports = {
    addProduct,
    uploadFile
}



