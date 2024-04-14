
const PORT = 4000;
const express = require("express");
const app = express();
const connectDB = require("./DB/db");
const apiRoutes = require("./app");

const dotenv = require("dotenv")
dotenv.config({
    path: "./.env"
})



// Connect to MongoDB
connectDB()
  .then(() => {
    app.use(apiRoutes);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

