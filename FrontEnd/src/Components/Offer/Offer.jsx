import React from 'react'
import './Offer.css'
import exclusive_img from '../Assets/exclusive_image.png'
export const Offer = () => {
  return (
    <div className="offer">
        <div className="offer-left">
            <h1>Exclusive</h1>            
            <h1>Offer for you</h1>
            <p>ONLY ONE BEST SELLOR PRODUCTS</p>
            <button>Check now</button>
        </div>
        <div className="offer-right">
          <img  src = {exclusive_img} alt="" />
        </div>
    </div>
  )
}
