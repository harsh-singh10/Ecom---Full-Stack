import React, { useContext } from 'react'
import './Cartitems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export const Cartitems = () => {
    const { all_product, Cartitems, removeToCart } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main" >
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
          
        </div >


    )
}
