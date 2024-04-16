import React, { useEffect } from 'react'
import "./ListProduct.css"
import { useState } from 'react'
import cross_icon from "../../assets/cross_icon.png"

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([])

  // const fetchInfo = async()=>{
  //   await fetch('http://localhost:4000/allproduct')
  //   .then((res)=>res.json())
  //   .then((data) => {setAllProducts(data)})
  // }

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproduct');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      // const data = await response.json();
      // setAllProducts(data);
      const responseData = await response.json();
      setAllProducts(responseData.data); // Set allProducts to the data array
    } catch (error) {
      console.error('Error fetching data:', error);
      // Optionally, you can set allProducts to a default value or handle the error in another way.
    }
  };


  useEffect(() => {
    fetchInfo()
  }, [])


  return (
    <div className='list-product' >
      <h1>All Product List </h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          {/* <hr /> */}
         
          {allProducts.map((product, index) => {
            return <div key={index} className="listproduct-fromat-main  listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p> {product.name} </p>
              <p> ${product.old_price} </p>
              <p> ${product.new_price} </p>
              <p>{product.category} </p>
              <img className='listproduct-remove-icon' src={cross_icon} alt="" />
            </div>
          })}
        </div>
     
    </div>
  )
}

export default ListProduct