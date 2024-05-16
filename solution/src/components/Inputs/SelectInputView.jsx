import React from "react";
import styles from "./SelectInputView.module.css";

const SelectInputView = ({ label, name, id, options, onChange, error }) => {
  return (
    <div className={styles.selectInputWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}:
      </label>
      <select name={name} id={id} className={styles.select} onChange={onChange}>
        <option value="">Select a {label}</option>
        {options.map((option, index) => (
          <option key={index}>{option}</option> // Ideally, use a unique identifier if available
        ))}
      </select>
      {error && (
        <p className={styles.error} aria-live="assertive">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectInputView;
