import React from "react";
import styles from "./TextInput.module.css";
import Loading from "../UIs/Loading";
import Check from "../UIs/Check";
import Error from "../UIs/Error";

const TextInput = React.forwardRef(({ label, handleChange, ...props }, ref) => {
  return (
    <div
      className={`styles.formInput ${
        props.state.isError ? styles.isError : ""
      }`}
    >
      <label htmlFor={props.id} required className={styles.label}>
        {label}:
      </label>
      <div className={styles.inputWrapper}>
        <input
          {...props}
          className={styles.input}
          onChange={handleChange}
          ref={ref}
        />
        <span className={styles.stateIcon}>
          {props.state.isValidating && <Loading />}
          {props.state.isValid && <Check />}
          {props.state.isError && <Error />}
        </span>

        {props.error && (
          <div className={styles["control-state"]}>{props.error}</div>
        )}
      </div>
    </div>
  );
});

export default TextInput;
