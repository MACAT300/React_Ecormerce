const express = require("express");
//create a express router
const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const Product = require("../controllers/product");

router.get("/", async (req, res) => {
  const category = req.query.category;
  const products = await getProducts(category);
  res.status(200).send(products);
});

// GET /movies/:id - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  const product = await getProduct(id);
  res.status(200).send(product);
});

router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check error - make sure all the fields are not empty
    if (!name || !description || !price || !category) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }
    res
      .status(200)
      // short hand
      .send(await addProduct(name, description, price, category));
  } catch (error) {
    console.log(error);

    res.status(400).send({ message: "Unknown error" });
  }
});

//  PUT /movies/68943cf564aa9f8354cef260 - update movie
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    // check error - make sure all the fields are not empty
    if (!name || !description || !price || !category) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      .send(await updateProduct(id, name, description, price, category));
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

//  DELETE /movies/68943cf564aa9f8354cef260 - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteProduct(id);

    res.status(200).send({
      message: `Product with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
