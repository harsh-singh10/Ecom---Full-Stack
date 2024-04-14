import React from 'react'
import './Breadcrum.css'
import arrow_icom from '../Assets/breadcrum_arrow.png'
export const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className="breadcrum">
        HOME <img src={arrow_icom} alt="" /> SHOP <img src={arrow_icom} alt="" /> {product.category} <img src={arrow_icom} alt="" /> {product.name}
    </div>
  )
}
