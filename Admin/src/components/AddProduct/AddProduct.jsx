import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from "../../assets/upload_area.svg"


const AddProduct = () => {

  const [image , setImage] = useState(false)

  const[productDetails,setProductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
    })


  const imageHandler = (e)=>{
    setImage(e.target.files[0])

  }

  const changeHandler = (e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const add_Product = async()=>{
    
      console.log(productDetails);
  }





  return (
    <div className='add-product' >

      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='type here' />
        </div>
      </div>

      <div className="addproduct-itemfield">
          <p> Product Category </p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector' >

              <option value="women">women</option>
              <option value="men">men</option>
              <option value="kid">kid</option>

          </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={add_Product} className='addproduct-btn' > Add </button>



    </div>
  )
}

export default AddProduct