const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const batchRoutes = require("./routes/batchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/batches", batchRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🍯 Honey Chain Backend is running!",
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("🍃 MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`🍯 Honey Chain server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });