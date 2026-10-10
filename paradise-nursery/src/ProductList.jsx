import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

// Fallback thumbnail (used if an image URL fails to load)
const placeholderImage = (name) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220">
    <rect width="100%" height="100%" fill="#e6f2e6"/>
    <text x="150" y="105" font-size="64" text-anchor="middle">🪴</text>
    <text x="150" y="160" font-size="16" text-anchor="middle" fill="#2e7d32" font-family="sans-serif">${name}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// 3 categories x 6 unique plants each.
// TIP: replace any `image` URL with your own if it doesn't load.
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.png', description: 'Produces oxygen at night, improving air quality.', cost: 15 },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: '', description: 'Adds humidity and removes toxins from the air.', cost: 20 },
      { name: 'Rubber Plant', image: '', description: 'Easy to grow and great at absorbing airborne toxins.', cost: 17 },
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Purifies the air and soothes burns and cuts.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: '', description: 'Calming scent, used in aromatherapy.', cost: 20 },
      { name: 'Jasmine', image: '', description: 'Sweet fragrance that promotes relaxation.', cost: 18 },
      { name: 'Rosemary', image: '', description: 'Invigorating scent, also great for cooking.', cost: 15 },
      { name: 'Mint', image: '', description: 'Refreshing aroma, perfect for teas and drinks.', cost: 12 },
      { name: 'Lemon Balm', image: '', description: 'Citrusy scent that helps reduce stress.', cost: 14 },
      { name: 'Hyacinth', image: '', description: 'Beautiful, strongly scented spring flowers.', cost: 22 },
    ],
  },
  {
    category: 'Low-Maintenance Succulents',
    plants: [
      { name: 'Jade Plant', image: '', description: 'Symbol of good luck, very easy to care for.', cost: 16 },
      { name: 'Echeveria', image: '', description: 'Rosette-shaped succulent that loves sunlight.', cost: 13 },
      { name: 'Zebra Haworthia', image: '', description: 'Striped leaves, thrives with little water.', cost: 11 },
      { name: 'Burro\'s Tail', image: '', description: 'Trailing stems, perfect for hanging pots.', cost: 19 },
      { name: 'Panda Plant', image: '', description: 'Soft, fuzzy leaves with a cute silver tone.', cost: 15 },
      { name: 'Ponytail Palm', image: '', description: 'Quirky look and stores water in its trunk.', cost: 24 },
    ],
  },
];

function ProductList({ onGoHome }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Total number of items in the cart (sum of quantities)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setShowCart(false);
    onGoHome();
  };
  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  return (
    <div>
      {/* Navbar – visible on BOTH the product listing and the cart page */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={handleHomeClick}>
          🌿 Paradise Nursery
        </div>
        <div className="navbar-links">
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#plants" className={!showCart ? 'active' : ''} onClick={handlePlantsClick}>Plants</a>
          <a href="#cart" className={`cart-link ${showCart ? 'active' : ''}`} onClick={handleCartClick} aria-label="Cart">
            <svg className="cart-icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <rect width="256" height="256" fill="none" />
              <circle cx="80" cy="216" r="12" fill="#fff" />
              <circle cx="184" cy="216" r="12" fill="#fff" />
              <path d="M42.3 72H221.7l-26.4 92.4A15.9 15.9 0 0 1 179.9 176H84.1a15.9 15.9 0 0 1-15.4-11.6L32.5 37.8A8 8 0 0 0 24.8 32H8" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-wrapper">
          {plantsArray.map((category) => (
            <section key={category.category}>
              <h2 className="category-title">{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img
                      src={plant.image || placeholderImage(plant.name)}
                      alt={plant.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = placeholderImage(plant.name);
                      }}
                    />
                    <h3 className="product-name">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <div className="product-price">${plant.cost}</div>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
