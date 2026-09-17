import { useState } from "react";

function VerifyHoney() {
  const params = new URLSearchParams(window.location.search);
  const qrBatch = params.get("batch") || "";

  const [batchId, setBatchId] = useState(qrBatch);
  const [batch, setBatch] = useState(null);
  const [message, setMessage] = useState("");

  const verifyHoney = async () => {
    const id = batchId.trim().toUpperCase();

    if (!id) {
      setMessage("Please enter Batch ID");
      return;
    }

    try {
      const response = await fetch(
        `http://https://honey-tracker-u4dp.onrender.com/api/batches/verify/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        setBatch(null);
        setMessage(`❌ ${data.message}`);
        return;
      }

      setBatch(data.batch);
      setMessage("✅ Honey Batch Verified!");
    } catch (error) {
      setBatch(null);
      setMessage("❌ Backend server se connection nahi ho pa raha.");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px 15px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🍯 Verify Honey</h1>

      <p>Enter your Honey Batch ID</p>

      <input
        type="text"
        placeholder="Example: HC-008"
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
        style={{
          padding: "12px",
          width: "250px",
          maxWidth: "90%",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={verifyHoney}
        style={{
          padding: "12px 20px",
          marginLeft: "10px",
          background: "#F5B942",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Verify
      </button>

      {message && (
        <p style={{ fontWeight: "bold", marginTop: "20px" }}>
          {message}
        </p>
      )}

      {batch && (
        <div>
          {/* Batch Details */}

          <div
            style={{
              maxWidth: "600px",
              margin: "30px auto",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "15px",
              textAlign: "left",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ textAlign: "center" }}>
              🍯 Batch Details
            </h2>

            <p>
              <strong>Batch ID:</strong> {batch.batchId}
            </p>

            <p>
              <strong>Beekeeper:</strong> {batch.beekeeper}
            </p>

            <p>
              <strong>Location:</strong> {batch.location}
            </p>

            <p>
              <strong>Harvest Date:</strong> {batch.harvestDate}
            </p>

            <p>
              <strong>Quantity:</strong> {batch.quantity}
            </p>

            <p>
              <strong>Processing:</strong> {batch.processing}
            </p>

            <p>
              <strong>Packaging:</strong> {batch.packaging}
            </p>
          </div>

          <hr style={{ margin: "30px 0" }} />

          {/* Honey Production Journey */}

          <h2>🍯 Honey Production Journey</h2>

          <div
            style={{
              lineHeight: "2",
              fontSize: "18px",
              margin: "20px auto",
              maxWidth: "600px",
            }}
          >
            <p>🌸 Flower Nectar Collection</p>
            <p>↓</p>
            <p>🐝 Bees Collect Nectar</p>
            <p>↓</p>
            <p>🏠 Nectar Processed Inside Hive</p>
            <p>↓</p>
            <p>🍯 Honeycomb Sealing</p>
            <p>↓</p>
            <p>🪣 Honey Harvesting</p>
            <p>↓</p>
            <p>🔬 Filtering & Quality Check</p>
            <p>↓</p>
            <p>📦 Packaging</p>
            <p>↓</p>
            <p>📱 Customer QR Verification</p>
          </div>

          <hr style={{ margin: "30px 0" }} />

          {/* Supply Chain Timeline */}

          <h2>🚚 Supply Chain History</h2>

          {batch.history && batch.history.length > 0 ? (
            <div
              style={{
                maxWidth: "650px",
                margin: "30px auto",
                textAlign: "left",
              }}
            >
              {batch.history.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "25px",
                  }}
                >
                  {/* Timeline Icon and Line */}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: "45px",
                    }}
                  >
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        background: "#F5B942",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "22px",
                      }}
                    >
                      {index === 0 ? "🐝" : "📦"}
                    </div>

                    {index !== batch.history.length - 1 && (
                      <div
                        style={{
                          width: "3px",
                          height: "100%",
                          minHeight: "100px",
                          background: "#F5B942",
                          marginTop: "5px",
                        }}
                      />
                    )}
                  </div>

                  {/* Entry Details */}

                  <div
                    style={{
                      flex: 1,
                      border: "1px solid #ddd",
                      borderRadius: "12px",
                      padding: "15px",
                      marginBottom: "5px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      background: "#fffdf5",
                    }}
                  >
                    <h3 style={{ marginTop: 0 }}>
                      {index + 1}. {entry.type}
                    </h3>

                    <p>
                      <strong>Name:</strong> {entry.name}
                    </p>

                    <p>
                      <strong>Location:</strong> {entry.location}
                    </p>

                    <p>
                      <strong>Quantity:</strong> {entry.quantity}
                    </p>

                    <p>
                      <strong>Date:</strong> {entry.date}
                    </p>

                    <p>
                      <strong>Details:</strong> {entry.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No supply chain history available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default VerifyHoney;