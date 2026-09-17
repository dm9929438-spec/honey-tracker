import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

function QRCodePage() {
  const [batchId, setBatchId] = useState("");

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🍯 Honey Chain</h1>
      <h2>Honey Batch QR Code</h2>

<input
  type="text"
  placeholder="Enter Batch ID (e.g. HC-001)"
  value={batchId}
  onChange={(e) => setBatchId(e.target.value.toUpperCase())}
/>

<p>Batch ID: {batchId}</p>

<div style={{ margin: "25px" }}></div>

      <div style={{ margin: "25px" }}>
        {batchId && (
        <QRCodeCanvas
          value={`https://honey-tracker.onrender.com/verify?batch=${batchId}`}
          size={220}
        />
        )}
      </div>

      <p>Scan this QR code to verify the honey.</p>
    </div>
  );
}

export default QRCodePage;