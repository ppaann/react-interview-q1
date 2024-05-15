import React from "react";
import styles from "./TextInput.module.css";
import Loading from "../UIs/Loading";
import Check from "../UIs/Check";
import Error from "../UIs/Error";

const TextInput = React.forwardRef(({ handleChange, ...props }, ref) => {
  return (
    <div
      className={`${styles.formInput} ${props.hasError ? styles.isError : ""}`}
    >
      <label htmlFor={props.id} required className={styles.label}>
        {props.label}:
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          value={props.value}
          className={styles.input}
          onChange={handleChange}
          placeholder={props.placeholder}
          ref={ref}
        />
        <span className={styles.stateIcon}>
          {props.isValidating && <Loading />}
          {props.isValid && <Check />}
          {props.hasError && <Error />}
        </span>

        {props.hasError && (
          <div className={styles.stateText}>{props.error}</div>
        )}
      </div>
    </div>
  );
});

export default TextInput;
