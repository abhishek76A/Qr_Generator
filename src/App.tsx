import React, { useState } from "react";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import "./App.css";

const App: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const generateQRCode = () => {
    setShowQRCode(true);
    saveURLAsTextFile();
  };

  const saveURLAsTextFile = () => {
    const blob = new Blob([url], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "URL.txt");
  };

  const saveQRCodeAsImage = () => {
    const svg = document.getElementById("qrCodeElement");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    saveAs(svgBlob, "qr_img.svg");
  };

  return (
    <div className="app-container">
      <h1 className="title">QR Code Generator</h1>

      <input
        type="text"
        value={url}
        onChange={handleInputChange}
        placeholder="Enter URL"
        className="input-field"
      />

      <button onClick={generateQRCode} className="button">
        Generate QR Code
      </button>

      {showQRCode && (
        <div className="qr-code-container">
          <QRCode id="qrCodeElement" value={url} size={150} />
          <button onClick={saveQRCodeAsImage} className="button save-image">
            Save QR Code as Image
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
