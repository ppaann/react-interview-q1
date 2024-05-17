import React from "react";
import styles from "./TextInput.module.css";
import Loading from "../UIs/Loading";
import Check from "../UIs/Check";
import Error from "../UIs/Error";

const TextInput = React.forwardRef(
  (
    {
      handleChange,
      id,
      label,
      type,
      name,
      value,
      placeholder,
      isValid,
      isValidating,
      hasError,
      error,
    },
    ref
  ) => {
    return (
      <div className={`${styles.formInput} ${hasError ? styles.isError : ""}`}>
        <label htmlFor={id} required className={styles.label}>
          {label}
        </label>
        <div className={styles.inputWrapper}>
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            className={styles.input}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref}
          />
          <span className={styles.stateIcon}>
            {isValidating && <Loading />}
            {isValid && <Check />}
            {hasError && <Error />}
          </span>

          {hasError && <div className={styles.stateText}>{error}</div>}
        </div>
      </div>
    );
  }
);

export default TextInput;
