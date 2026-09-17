const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    batchId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    beekeeper: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    harvestDate: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    processing: {
      type: String,
      required: true,
    },

    packaging: {
      type: String,
      required: true,
    },

    history: [
  {
    type: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      required: true,
    },
  },
],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", batchSchema);