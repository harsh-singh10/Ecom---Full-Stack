

import React, { useContext } from 'react';
import './CSS/Cart.css';
import { ShopContext } from '../Context/ShopContext';

export const Cart = () => {
  const { cart, totalAmount, handleDecrement, handleIncrement } = useContext(ShopContext);

  // Filter out items with quantity zero
  const filteredCart = cart.filter(item => item.quantity >= 1);

  return (
    <div className="cart-container">
      {filteredCart.length === 0 ? (
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>
          <p>Start adding items to fill your cart!</p>
        </div>
      ) : (
        <>
          <h2 className="cart-heading">Your Shopping Cart</h2>
          <div className="cart-items">
            {filteredCart.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="item-image-container">
                  <img className="item-image" src={item.image} alt={item.name} width={100} />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="quantity-controls">
                    <button className="quantity-button" onClick={() => handleDecrement(index)}>-</button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button className="quantity-button" onClick={() => handleIncrement(index)}>+</button>
                  </div>
                  <div className="item-price-container">
                    <span className="item-price">Price: ${item.new_price.toFixed(2)}</span>
                    <span className="item-total">Total: ${item.new_price * item.quantity}.00</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            
          </div>
        </>
      )}
    </div>
  );
};
