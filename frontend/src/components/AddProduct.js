import React, { useState } from 'react';
import api from '../services/axios';
import { Link } from 'react-router-dom';
import Layout from './Layout';

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '' });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', product);
      await api.post('/products', product, {});
      // Clear the form after successful submission
      setProduct({ name: '', description: '', price: '' });
      console.log('Product added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <h2>Add Product</h2>
        <Link to="/">Back to Product List</Link>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;