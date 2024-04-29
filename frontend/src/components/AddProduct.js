import React, { useState } from 'react';
import api from '../services/axios';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  max-width: 500px;
`;

const ImageUploadContainer = styled.div`
  max-width: 500px;
  border: 1px dashed #ccc;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    border-color: #999;
  }
`;

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '' });
  const [image, setImage] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      if (image) {
        formData.append('image', image);
      }
      await api.post('/products', formData);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          New product added successfully! 
        </Alert>
      )}
      <h2>Add Product</h2>
      <Link to="/">Back to Product List</Link>
      <Row>
        <Col md={6}>
          <StyledForm onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={3}
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step={0.01}
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="0.00"
                className="mb-3"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </StyledForm>
        </Col>
        <Col md={6}>
          <ImageUploadContainer>
            {image && (
              <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            )}
            {!image && (
              <>
                <p>Click or drag and drop an image here</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </>
            )}
          </ImageUploadContainer>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddProduct;