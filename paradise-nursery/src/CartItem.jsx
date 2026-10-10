import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const placeholderImage = (name) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <rect width="100%" height="100%" fill="#e6f2e6"/>
    <text x="100" y="115" font-size="64" text-anchor="middle">🪴</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total cost for ONE plant type (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Total amount for the WHOLE cart
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Coming Soon');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Quantity would drop to 0 -> remove the item from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-total-amount">Total Cart Amount: ${calculateTotalAmount()}</div>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Add some plants!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image || placeholderImage(item.name)}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = placeholderImage(item.name);
                }}
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <div className="cart-item-cost">Unit price: ${item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button" onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button" onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="get-started-button1" onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="get-started-button1 checkout-button" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
