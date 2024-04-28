// ./src/index.js

//importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
//const jwt = require('express-jwt');
//const jwksRsa = require('jwks-rsa');
const { getProducts, insertProduct, deleteProduct, updateProduct } = require('./database/products');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests (not very secure)
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

/*const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-5zbrlv1ll45d1otx.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://c20703429-api',
  issuer: `https://dev-5zbrlv1ll45d1otx.eu.auth0.com/`,
  algorithms: ['RS256']
});*/


// Endpoint to get all products
app.get('/api/products', async (req, res) => {
  res.send(await getProducts());
});


//app.use(checkJwt);

// Endpoint to add a new product
app.post('/api/products', async (req, res) => {
  const newProduct = req.body;
  await insertProduct(newProduct);
  res.send({ message: 'New product inserted.' });
});

// Endpoint to delete a product
app.delete('/api/products/:id', async (req, res) => {
  await deleteProduct(req.params.id);
  res.send({ message: 'Product removed.' });
});

// Endpoint to update a product
app.put('/api/products/:id', async (req, res) => {
  const updatedProduct = req.body;
  await updateProduct(req.params.id, updatedProduct);
  res.send({ message: 'Product updated.' });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {

  // Insert initial product data
  await insertProduct({ name: 'Adidas Shoes', description: 'Size 11 Mens', price: 9.99 });
  await insertProduct({ name: 'Levis Jeans', description: 'W36 Regular', price: 14.99 });
  // You can add more initial products here

  // start the server
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});