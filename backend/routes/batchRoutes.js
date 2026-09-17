const express = require("express");
const Batch = require("../models/Batch");

const router = express.Router();

// Add a new honey batch
router.post("/add", async (req, res) => {
  try {
    const {
      batchId,
      beekeeper,
      location,
      harvestDate,
      quantity,
      processing,
      packaging,
    } = req.body;

    if (
      !batchId ||
      !beekeeper ||
      !location ||
      !harvestDate ||
      !quantity ||
      !processing ||
      !packaging
    ) {
      return res.status(400).json({
        message: "All batch details are required.",
      });
    }

    const id = batchId.trim().toUpperCase();

    const existingBatch = await Batch.findOne({ batchId: id });

    if (existingBatch) {
      return res.status(409).json({
        message: "This Batch ID already exists.",
      });
    }

    const newBatch = await Batch.create({
      batchId: id,
      beekeeper: beekeeper.trim(),
      location: location.trim(),
      harvestDate,
      quantity: quantity.trim(),
      processing: processing.trim(),
      packaging: packaging.trim(),
      history: [
  {
    type: "Beekeeper",
    name: beekeeper.trim(),
    location: location.trim(),
    quantity: quantity.trim(),
    date: harvestDate,
    details: `${processing.trim()} | ${packaging.trim()}`,
  },
],
    });

    res.status(201).json({
      message: "Honey Batch added successfully.",
      batch: newBatch,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add honey batch.",
    });
  }
});
// Add seller / supply chain history
router.post("/history/:batchId", async (req, res) => {
  try {
    const id = req.params.batchId.trim().toUpperCase();

    const {
      sellerName,
      location,
      date,
      quantity,
      sentTo,
      deliveryDetails,
    } = req.body;

    if (
      !sellerName ||
      !location ||
      !date ||
      !quantity ||
      !sentTo ||
      !deliveryDetails
    ) {
      return res.status(400).json({
        message: "All seller details are required.",
      });
    }

    const batch = await Batch.findOne({ batchId: id });

    if (!batch) {
      return res.status(404).json({
        message: "Batch ID not found.",
      });
    }

    batch.history.push({
      type: "Seller",
      name: sellerName.trim(),
      location: location.trim(),
      quantity: quantity.trim(),
      date,
      details: `Sent to: ${sentTo.trim()} | Delivery: ${deliveryDetails.trim()}`,
    });

    await batch.save();

    res.json({
      message: "Seller entry added successfully.",
      batch,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add seller entry.",
    });
  }
});
// Verify a honey batch
router.get("/verify/:batchId", async (req, res) => {
  try {
    const id = req.params.batchId.trim().toUpperCase();

    const batch = await Batch.findOne({ batchId: id });

    if (!batch) {
      return res.status(404).json({
        message: "Batch ID not found.",
      });
    }

    res.json({
      message: "Honey Batch Verified!",
      batch,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to verify honey batch.",
    });
  }
});

module.exports = router;