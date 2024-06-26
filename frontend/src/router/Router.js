import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from '../components/ProductList';
import AddProduct from '../components/AddProduct';
import UpdateProduct from '../components/UpdateProduct';
import SearchProducts from '../components/SearchProducts';
import About from '../components/About';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={
          <AddProduct />
        }/>
        <Route path="/update/:id" element={
          <UpdateProduct />
        } />
        <Route path="/search" element={
          <SearchProducts/>
          } />
        <Route path="/about" element={
          <About/>
          } />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;