import React from 'react';
import { useLocation } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Cart Page</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">No items in the cart.</div>
      ) : (
        cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h4>{item.title}</h4>
              <p>${item.price}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
