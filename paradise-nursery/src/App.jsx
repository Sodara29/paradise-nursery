import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => setShowProductList(true);
  const handleGoHome = () => setShowProductList(false);

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="landing-divider"></div>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
            <AboutUs />
          </div>
        </div>
      ) : (
        <div className="product-list-container">
          <ProductList onGoHome={handleGoHome} />
        </div>
      )}
    </div>
  );
}

export default App;
