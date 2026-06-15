const express = require("express");
const cors = require("cors");

const vendorRoutes = require("./routes/vendorRoutes");

const categoryRoutes = require("./routes/categoryRoutes");

const cityRoutes = require("./routes/cityRoutes");
require("dotenv").config();

const app = express();

const authRoutes =
  require(
    "./routes/authRoutes"
  );

const userRoutes =
  require(
    "./routes/userRoutes"
  );

app.use(cors());
app.use(express.json());

app.use("/vendors", vendorRoutes);

app.use("/categories", categoryRoutes);

app.use("/cities", cityRoutes);

app.use(
  "/auth",
  authRoutes
);

app.use(
  "/users",
  userRoutes
);

app.listen(5000, () => {
  console.log("Server running");
});