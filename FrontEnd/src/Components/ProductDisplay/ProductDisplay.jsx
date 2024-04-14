 import React, { useContext } from 'react'
import star_icom from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext'
export const ProductDisplay = (props) => {
    const { product } = props;

    const {addToCart} = useContext(ShopContext)

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='main-img' src={product.image} alt="" />
                </div>
            </div >
            <div className="productdisplay-right" >
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icom} alt="" />
                    <img src={star_icom} alt="" />
                    <img src={star_icom} alt="" />
                    <img src={star_icom} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus tenetur quaerat voluptatibus reprehenderit in, sint molestiae, itaque fugiat
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L </div>
                        <div>XL </div>
                        <div>XXL</div>
                    </div>
                </div>
                {/* <button onClick={()=>{addToCart(product.id)}} >Add to Cart</button> */}
                <button onClick={()=>{addToCart(product)}} >Add to Cart</button>
            </div>
        </div >
    )
}
