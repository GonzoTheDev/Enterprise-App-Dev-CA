// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { startDatabase } = require('./database/mongo');
const { getProducts, insertProduct, deleteProduct, updateProduct } = require('./database/products');
const fs = require('fs');
const path = require('path');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// Increase the request payload size limit
app.use(bodyParser.json({ limit: '50mb' }));

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests (not very secure)
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// Function to read an image file and convert it to base64
function getBase64FromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const base64 = `data:image/jpeg;base64,${data.toString('base64')}`;
        resolve(base64);
      }
    });
  });
}

// Endpoint to get all products
app.get('/api/products', async (req, res) => {
  res.send(await getProducts());
});

// Endpoint to add a new product
app.post('/api/products', async (req, res) => {
  const newProduct = req.body;
  const image = newProduct.image;
  delete newProduct.image;
  await insertProduct(newProduct, image);
  res.status(201).send({ message: 'New product inserted.' });
});

// Endpoint to delete a product
app.delete('/api/products/:id', async (req, res) => {
  await deleteProduct(req.params.id);
  res.send({ message: 'Product removed.' });
});

// Endpoint to update a product
app.put('/api/products/:id', async (req, res) => {
  const updatedProduct = req.body;
  const image = updatedProduct.image;
  delete updatedProduct.image;
  await updateProduct(req.params.id, updatedProduct, image);
  res.send({ message: 'Product updated.' });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  const imagesDir = path.join(__dirname, 'images');

  // Insert initial product data
  const product1Base64 = await getBase64FromFile(path.join(imagesDir, 'product1.jpg'));
  await insertProduct({ name: 'Apple iPhone 13 Pro', description: 'Apple iPhone 13 Pro, 256GB, Sierra Blue', price: 999.99, image: product1Base64 });

  const product2Base64 = await getBase64FromFile(path.join(imagesDir, 'product2.jpg'));
  await insertProduct({ name: 'Samsung Galaxy S22 Ultra', description: 'Samsung Galaxy S22 Ultra, 256GB, Phantom Black', price: 1199.99, image: product2Base64 });

  const product3Base64 = await getBase64FromFile(path.join(imagesDir, 'product3.jpg'));
  await insertProduct({ name: 'Google Pixel 6 Pro', description: 'Google Pixel 6 Pro, 128GB, Stormy Black', price: 899.99, image: product3Base64 });

  const product4Base64 = await getBase64FromFile(path.join(imagesDir, 'product4.jpg'));
  await insertProduct({ name: 'OnePlus 9 Pro', description: 'OnePlus 9 Pro, 256GB, Morning Mist', price: 1069.99, image: product4Base64 });

  const product5Base64 = await getBase64FromFile(path.join(imagesDir, 'product5.jpg'));
  await insertProduct({ name: 'Sony WH-1000XM4', description: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones, Black', price: 349.99, image: product5Base64 });

  const product6Base64 = await getBase64FromFile(path.join(imagesDir, 'product6.jpg'));
  await insertProduct({ name: 'Fitbit Versa 3', description: 'Fitbit Versa 3 Health & Fitness Smartwatch, Black/Black', price: 199.99, image: product6Base64 });

  const product7Base64 = await getBase64FromFile(path.join(imagesDir, 'product7.jpg'));
  await insertProduct({ name: 'Bose QuietComfort 45', description: 'Bose QuietComfort 45 Wireless Noise Cancelling Headphones', price: 329.99, image: product7Base64 });

  const product8Base64 = await getBase64FromFile(path.join(imagesDir, 'product8.jpg'));
  await insertProduct({ name: 'Canon EOS R6', description: 'Canon EOS R6 Mirrorless Camera Body', price: 2499.99, image: product8Base64 });

  const product9Base64 = await getBase64FromFile(path.join(imagesDir, 'product9.jpg'));
  await insertProduct({ name: 'Instant Pot Duo Crisp', description: 'Instant Pot Duo Crisp 11-in-1 Air Fryer and Electric Pressure Cooker', price: 149.99, image: product9Base64 });

  const product10Base64 = await getBase64FromFile(path.join(imagesDir, 'product10.jpg'));
  await insertProduct({ name: 'Dyson V8 Absolute', description: 'Dyson V8 Absolute Cordless Vacuum Cleaner', price: 449.99, image: product10Base64 });

  const product11Base64 = await getBase64FromFile(path.join(imagesDir, 'product11.jpg'));
  await insertProduct({ name: 'Samsung 65" QLED 4K TV', description: 'Samsung 65" QLED 4K UHD HDR Smart TV', price: 1299.99, image: product11Base64 });

  const product12Base64 = await getBase64FromFile(path.join(imagesDir, 'product12.jpg'));
  await insertProduct({ name: 'Apple Watch Series 7', description: 'Apple Watch Series 7, GPS, 41mm, Midnight Aluminum Case with Sport Band', price: 399.99, image: product12Base64 });

  const product13Base64 = await getBase64FromFile(path.join(imagesDir, 'product13.jpg'));
  await insertProduct({ name: 'Bose SoundLink Revolve+', description: 'Bose SoundLink Revolve+ Portable Bluetooth Speaker', price: 299.99, image: product13Base64 });

  const product14Base64 = await getBase64FromFile(path.join(imagesDir, 'product14.jpg'));
  await insertProduct({ name: 'Philips Air Fryer XXL', description: 'Philips Air Fryer XXL, 3 Quart Capacity', price: 249.99, image: product14Base64 });

  const product15Base64 = await getBase64FromFile(path.join(imagesDir, 'product15.jpg'));
  await insertProduct({ name: 'Microsoft Surface Pro 8', description: 'Microsoft Surface Pro 8, 13" Touch Screen, Intel i5, 8GB RAM, 256GB SSD', price: 1099.99, image: product15Base64 });


  console.log('Sample data inserted');
});

// start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});