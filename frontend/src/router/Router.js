import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from '../components/ProductList';
import AddProduct from '../components/AddProduct';
import UpdateProduct from '../components/UpdateProduct';

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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;