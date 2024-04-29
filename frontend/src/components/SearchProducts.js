import React, { useState, useEffect } from 'react';
import api from '../services/axios';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Layout from './Layout';

const StyledCard = styled(Card)`
  margin-bottom: 1rem;
`;

const SearchProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      const productsWithImages = response.data.map((product) => ({
        ...product,
        imageUrl: product.image || 'https://via.placeholder.com/150',
      }));
      setProducts(productsWithImages);
      setFilteredProducts(productsWithImages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h2>Search Products</h2>
      <Form.Control
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
        style={{ maxWidth: '500px', margin: '0 auto' }}
      />
      <Row>
        {filteredProducts.map((product) => (
          <Col md={4} key={product._id}>
            <StyledCard>
              <Card.Img
                variant="top"
                className="m-1"
                src={product.imageUrl}
                alt={product.name}
                style={{ maxHeight: '150px', objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: €{product.price}</Card.Text>
                <Button
                  variant="danger"
                  className="m-1"
                  onClick={() => deleteProduct(product._id)}
                >
                  <FaTrash /> Delete
                </Button>
                <Button
                  variant="dark"
                  as={Link}
                  className="m-1"
                  to={`/update/${product._id}`}
                >
                  <FaEdit /> Update
                </Button>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default SearchProducts;