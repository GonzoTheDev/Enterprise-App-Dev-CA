// ./database/products.js

const { getDatabase } = require('./mongo');
const { ObjectID } = require('mongodb');

const collectionName = 'products';

async function getProducts() {
  const database = await getDatabase();
  const products = await database.collection(collectionName).find({}).toArray();

  return products;
}

async function insertProduct(product, image) {
  const database = await getDatabase();
  let newProduct = { ...product };
  if (image) {
    newProduct.image = image;
  }
  const { insertedId } = await database.collection(collectionName).insertOne(newProduct);
  return insertedId;
}

async function deleteProduct(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

async function updateProduct(id, product, image) {
  const database = await getDatabase();
  delete product._id;
  let updatedProduct = { $set: { ...product } };
  if (image) {
    updatedProduct.$set.image = image;
  }
  const result = await database.collection(collectionName).findOneAndUpdate(
    { _id: new ObjectID(id) },
    updatedProduct,
    { returnDocument: 'after' }
  );

  return result.value;
}

module.exports = {
  getProducts,
  insertProduct,
  deleteProduct,
  updateProduct,
};