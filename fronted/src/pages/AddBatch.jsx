import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function AddBatch() {
  const [batch, setBatch] = useState({
    batchId: "",
    beekeeper: "",
    location: "",
    harvestDate: "", 
    quantity: "",
    processing: "",
    packaging: "",
  });

  const [savedBatch, setSavedBatch] = useState(null);

  const handleChange = (e) => {
    setBatch({
      ...batch,
      [e.target.name]: e.target.value,
    });
  };

  const saveBatch = async (e) => {
    e.preventDefault();

    if (!batch.batchId.trim()) {
      alert("❌ Please enter a Batch ID!");
      return;
    }

    try {
      const response = await fetch(
        "http://https://honey-tracker-u4dp.onrender.com/api/batches/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...batch,
            batchId: batch.batchId.trim().toUpperCase(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("❌ " + (data.message || "Batch save failed!"));
        return;
      }

      alert("✅ Honey Batch Saved Successfully!");

      const finalBatch = {
        ...batch,
        batchId: batch.batchId.trim().toUpperCase(),
      };

      setSavedBatch(finalBatch);

      setBatch(finalBatch);
    } catch (error) {
      console.error("Save error:", error);
      alert(
        "❌ Backend se connection nahi ho raha. Check karo server running hai ya nahi."
      );
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <h1>🍯 Add Honey Batch</h1>

      <form onSubmit={saveBatch}>
        <input
          name="batchId"
          placeholder="Batch ID (HC-001)"
          value={batch.batchId}
          onChange={handleChange}
        />

        <input
          name="beekeeper"
          placeholder="Beekeeper Name"
          value={batch.beekeeper}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Hive / Location"
          value={batch.location}
          onChange={handleChange}
        />

        <input
          type="date"
          name="harvestDate"
          value={batch.harvestDate}
          onChange={handleChange}
        />

        <input
          name="quantity"
          placeholder="Quantity (e.g. 50 kg)"
          value={batch.quantity}
          onChange={handleChange}
        />

        <input
          name="processing"
          placeholder="Processing Details"
          value={batch.processing}
          onChange={handleChange}
        />

        <input
          name="packaging"
          placeholder="Packaging Details"
          value={batch.packaging}
          onChange={handleChange}
        />

        <button type="submit">Save Honey Batch</button>
      </form>

      {savedBatch && (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <h2>🍯 Batch QR Code</h2>

          <p>Batch ID: {savedBatch.batchId}</p>

          <QRCodeCanvas
            value={`http://localhost:5173/verify?batch=${savedBatch.batchId}`}
            size={220}
          />

          <p>Scan this QR code to verify the honey.</p>
        </div>
      )}
    </div>
  );
}

export default AddBatch;