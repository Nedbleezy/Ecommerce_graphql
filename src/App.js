import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import AllProducts from './pages/allproducts/AllProducts';
import Cart from './pages/cart/Cart';
import ClotheProducts from './pages/clotheproducts/ClotheProducts';
import TechProducts from './pages/techproducts/TechProducts';
import NavBar from './components/navbar/NavBar';
import ProductDetails from './pages/productDetails/ProductDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar />

        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route index element={<AllProducts />} />
            <Route path='tech' element={<TechProducts />} />
            <Route path='all' element={<AllProducts />} />
            <Route path='product/:id' element={<ProductDetails />} />
            <Route path='clothes' element={<ClotheProducts />} />
            <Route path='cart' element={<Cart />} />
          </Route>
        </Routes>
      </>
    );
  }
}

export default App;
