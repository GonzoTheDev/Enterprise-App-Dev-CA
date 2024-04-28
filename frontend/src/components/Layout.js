// Layout.js
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  background-color: #333;
  color: #fff;
`;

const StyledNavLink = styled(Nav.Link)`
  color: #fff;
  &:hover {
    color: #ccc;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <StyledNavbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            My Product App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <StyledNavLink as={Link} to="/">
                Products
              </StyledNavLink>
              <StyledNavLink as={Link} to="/add">
                Add Product
              </StyledNavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>

      <Container className="my-4">{children}</Container>
    </>
  );
};

export default Layout;