// import the Movie model
const Product = require("../models/product");

async function getProducts(category) {
  let filter = {};

  // if rating exists, then only add it into the filter container
  if (category) {
    filter.category = category;
  }

  // load the movies data from Mongodb
  const products = await Product.find(filter).sort({ _id: -1 });
  // return the products
  return products;
}

async function getProduct(id) {
  const product = await Product.findById(id);
  return product;
}

async function addProduct(name, description, price, category) {
  // create new movie
  const newProduct = new Product({
    name: name,
    description: description,
    price: price,
    category: category,
  });
  // save the new movie into mongodb
  await newProduct.save(); // clicking the "save" button
  return newProduct;
}

async function updateProduct(id, name, description, price, category) {
  return await Product.findByIdAndUpdate(
    id,
    {
      name: name,
      description: description,
      price: price,
      category: category,
    },
    {
      new: true, // return the updated data
    }
  );
}

async function deleteProduct(id) {
  // delete the movie
  await Product.findByIdAndDelete(id);
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
