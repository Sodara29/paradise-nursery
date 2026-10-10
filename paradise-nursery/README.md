# Paradise Nursery – Shopping Application

**Project name:** Paradise Nursery
**Course:** Developing Front-End Apps with React, My name is Sodara Sieng

Paradise Nursery is an online houseplant store built with **React** and **Redux Toolkit**.

## Features
- Landing page with company name, background image, "Get Started" button and an About Us section
- Product listing: 3 categories × 6 unique houseplants (thumbnail, name, price)
- "Add to Cart" button that adds the plant, disables itself, and updates the cart icon count
- Navbar (Home, Plants, Cart) on both the Product Listing and Cart pages
- Shopping cart: thumbnail, name, unit price, per-item subtotal, total amount
- Increase / decrease quantity, delete item
- Checkout button ("Coming Soon") and Continue Shopping button

## Tech stack
React 18, Redux Toolkit, React-Redux, Vite

## Run locally
```bash
npm install
npm run dev
```


## Project structure
```
src/
  main.jsx        – entry point, Redux Provider
  store.js        – Redux store
  CartSlice.jsx   – cart slice (addItem, removeItem, updateQuantity)
  App.jsx         – landing page
  App.css         – landing page styles + background image
  AboutUs.jsx     – company info
  ProductList.jsx – navbar + plant listing (+ cart view)
  ProductList.css
  CartItem.jsx    – shopping cart page
  CartItem.css
```
