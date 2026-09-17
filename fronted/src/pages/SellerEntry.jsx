import { useState } from "react";

function SellerEntry() {
  const [form, setForm] = useState({
    batchId: "",
    sellerName: "",
    location: "",
    date: "",
    quantity: "",
    sentTo: "",
    deliveryDetails: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addSellerEntry = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://https://honey-tracker-u4dp.onrender.com/api/batches/history/${form.batchId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sellerName: form.sellerName,
            location: form.location,
            date: form.date,
            quantity: form.quantity,
            sentTo: form.sentTo,
            deliveryDetails: form.deliveryDetails,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(`❌ ${data.message || "Seller entry failed!"}`);
        return;
      }

      setMessage("✅ Seller entry added successfully!");

      setForm({
        batchId: "",
        sellerName: "",
        location: "",
        date: "",
        quantity: "",
        sentTo: "",
        deliveryDetails: "",
      });
    } catch (error) {
      console.error("Seller entry error:", error);
      setMessage("❌ Backend server se connection nahi ho pa raha.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🚚 Seller Entry</h1>

      <form onSubmit={addSellerEntry}>
        <input
          name="batchId"
          placeholder="Batch ID: HC-008"
          value={form.batchId}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="sellerName"
          placeholder="Seller Name"
          value={form.sellerName}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="location"
          placeholder="Current Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="sentTo"
          placeholder="Sent To"
          value={form.sentTo}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          name="deliveryDetails"
          placeholder="Delivery Details"
          value={form.deliveryDetails}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <button type="submit">Add Seller Entry</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default SellerEntry;