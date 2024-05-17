import React from "react";
import styles from "./SelectInputView.module.css";

const SelectInputView = React.forwardRef(
  ({ label, name, id, options, onChange, error, selectedOption = "" }, ref) => {
    return (
      <div
        className={`${styles.selectInputWrapper} ${
          error ? styles.isError : ""
        }`}
      >
        <label htmlFor={id} className={styles.label}>
          {label}:
        </label>
        <select
          name={name}
          id={id}
          className={styles.select}
          onChange={onChange}
          ref={ref}
          value={selectedOption}
        >
          <option value="">Select a {label}</option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option> // Ideally, use a unique identifier if available
            ))}
        </select>
        {error && (
          <p className={styles.error} aria-live="assertive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default SelectInputView;
