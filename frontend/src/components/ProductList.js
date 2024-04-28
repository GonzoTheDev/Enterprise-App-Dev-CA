import React, { useState, useEffect } from 'react';
import api from '../services/axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Layout from './Layout';

const StyledCard = styled(Card)`
  margin-bottom: 1rem;
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
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
      <h2>Product List</h2>
      <Row>
        {products.map((product) => (
          <Col md={4} key={product._id}>
            <StyledCard>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Button
                  variant="danger"
                  className="mr-2"
                  onClick={() => deleteProduct(product._id)}
                >
                  <FaTrash /> Delete
                </Button>
                <Button
                  variant="primary"
                  as={Link}
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

export default ProductList;