// load the environment variables
require("dotenv").config();

const express = require("express");
// import mongoose
const mongoose = require("mongoose");
const cors = require("cors");

// setup an express app
const app = express();

// setup a middleware to handle JSON request
app.use(express.json());

// setup cors policy
app.use(cors());

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    // wait for the MongoDB to connect
    await mongoose.connect(process.env.MONGODB_URL + "/netflix");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

// import all the routers
const productRoutes = require("./routes/product");
app.use("/products", productRoutes);
app.use("/orders", require("./routes/order"));
app.use("/payment", require("./routes/payment"));
app.use("/image", require("./routes/image"));
app.use("/categories", require("./routes/category"));
app.use("/users", require("./routes/user"));

// set a folder as a static path
app.use("/uploads", express.static("uploads"));

// start the express server
app.listen(5123, () => {
  console.log("server is running at http://localhost:5123");
});
