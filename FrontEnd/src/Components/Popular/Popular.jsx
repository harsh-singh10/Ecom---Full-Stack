import React, { useEffect, useState } from 'react'
import './Popular.css'
//import data_product from '../Assets/data'
import { Item } from '../Item/Item'
export const Popular = () => {

  const [womenProduct , setWomenProduct] = useState([])

  useEffect(()=>{

    fetch('http://localhost:4000/popularwomen')
    .then((res)=>res.json())
    .then((data)=>setWomenProduct(data))

  },[])

  return (
    <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
          <hr />
        <div className="popular-item">
        {
            womenProduct.map((item , i)=>{
                return <Item key={i} id={item.id} name ={item.name} image = {item.image} new_price ={item.new_price} old_price ={item.old_price} />
            })
        } 
        </div>
    </div>
  )
}
