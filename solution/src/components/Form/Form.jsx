import React, { useState } from "react";
import { isNameValid } from "../../mock-api/apis";

import { useAddFormDataContext } from "../../utils/context/FormDataContext";
import DebouncedTextInput from "../Inputs/DebouncedTextInput";
import SelectInput from "../Inputs/SelectInput";
import { useRef } from "react";

const Form = () => {
  // set context
  const addFormData = useAddFormDataContext();

  // form inputs
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const [errors, setErrors] = useState({ username: "", location: "" });

  const handleUsernameChange = () => {
    if (errors.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
  };
  const handleLocationChange = () => {
    if (errors.location) {
      setErrors((prevErrors) => ({ ...prevErrors, location: "" }));
    }
  };

  const handleResetForm = () => {
    if (inputRef.current) inputRef.current.reset();
    if (selectRef.current) selectRef.current.reset();
    setErrors({ username: "", location: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const location = data.get("location");

    // error handling
    const hasNameError = inputRef.current.getValidationState().hasError;
    if (hasNameError) {
      inputRef.current.focus();
    }

    let isValid = true;
    let newErrors = { username: "", location: "" };

    if (username === "") {
      newErrors.username = "Name is required";
      isValid = false;
    }
    if (location === "") {
      newErrors.location = "Location is required";
      isValid = false;
    }
    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    addFormData({ username, location });
    handleResetForm();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <DebouncedTextInput
        validateFunc={isNameValid}
        id="text_input"
        label="Name:"
        type="text"
        name="username"
        placeholder="Enter your name"
        ref={inputRef}
        externalError={errors.username}
        onValueChange={handleUsernameChange}
      />
      <SelectInput
        id="select"
        label="Location"
        name="location"
        ref={selectRef}
        externalError={errors.location}
        selectedOptionChange={handleLocationChange}
      />
      <div className="form-actions">
        <button
          type="reset"
          className="button button-secondary"
          onClick={handleResetForm}
        >
          Clear
        </button>
        <button type="submit" className="button">
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
