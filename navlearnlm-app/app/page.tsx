"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

export default function GenericFormPage() {
  const [inputText, setInputText] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const submitForm = async () => {
    if (!inputText.trim()) {
      setStatus("Please enter some text first.");
      return;
    }

    try {
      setStatus("Submitting...");
      
      const response = await fetch("/api/process-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (response.ok) {
        const result = await response.json();
        setStatus(`Success: ${result.message}`);
      } else {
        const error = await response.json();
        setStatus(`Error: ${error.error || "Something went wrong."}`);
      }
    } catch (err) {
      setStatus(`Error: ${err}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Submit Text Form</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter your text here..."
        value={inputText}
        onChange={handleInputChange}
      />
      <button className={styles.button} onClick={submitForm}>
        Submit
      </button>
      {status && <p className={styles.status}>{status}</p>}
    </div>
  );
}
