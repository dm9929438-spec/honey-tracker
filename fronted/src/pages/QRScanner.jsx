import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QRScanner() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    const onScanSuccess = (decodedText) => {
      scanner.clear();

      // QR me agar verification URL hai, usi URL par jao
      if (decodedText.startsWith("http")) {
        window.location.href = decodedText;
      } else {
        window.location.href = `/Verify?batch=${decodedText}`;
      }
    };

    scanner.render(onScanSuccess, () => {});

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>📱 Scan Honey QR</h1>

      <p>Place the honey QR code inside the box.</p>

      <div
        id="qr-reader"
        style={{ maxWidth: "500px", margin: "30px auto" }}
      ></div>
    </div>
  );
}

export default QRScanner;