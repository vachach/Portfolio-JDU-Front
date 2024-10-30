// src/components/QATextField.js

import React, { useState, useEffect } from "react";
import { TextField as MuiTextField } from "@mui/material";
import styles from "./QATextField.module.css"; // Assuming you have some CSS for styling

const QATextField = ({ category, question, keyName, editData, updateEditData }) => {
  // Initialize editData with the value from props
  const [localEditData, setLocalEditData] = useState(editData[category]?.[keyName]?.answer || "");

  // Update localEditData when editData changes
  useEffect(() => {
    setLocalEditData(editData[category]?.[keyName]?.answer || "");
  }, [editData, category, keyName]);

  const handleChange = (e) => {
    const updatedValue = e.target.value;
    setLocalEditData(updatedValue);
    updateEditData(category, keyName, updatedValue); // Call the function to update parent state
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{question}</div>
      <div className={styles.data}>
        <MuiTextField
          value={localEditData}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
        />
      </div>
    </div>
  );
};

export default QATextField;
