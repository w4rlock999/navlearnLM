"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadPDF = async () => {
    if (!file) {
      setStatus("Please select a PDF file first.");
      return;
    }
    console.log(file)

    try {
      setStatus("Uploading...")

      const fileBlob = file
      const response = await fetch("/api/process-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: fileBlob,
      })

      if (response.ok) {
        const result = await response.json()
        setStatus(`Success: ${result.message}`)

      } else {
        const error = await response.json()
        setStatus(`Error: ${error.error || "Something went wrong."}`)
      }
    } catch (err) {
      setStatus(`Error: ${err}`)
    } 
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1_}>Upload a PDF</h1>
      <input className={styles.input_}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <button className={styles.button_} onClick={uploadPDF}>Upload and Process</button>
      {status && <p className={styles.p_} >{status}</p>}
    </div>
  );
}
