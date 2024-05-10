import React, { useContext } from "react";
import { isNameValid } from "../../mock-api/apis";

import { FormDataContext } from "../../utils/context/FormDataContext";
import DebouncedInput from "../Inputs/DebouncedInput";

const Form = () => {
  // set context
  const { addFormData } = useContext(FormDataContext);

  const handleResetForm = () => {
    // setValues(initValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    addFormData({ username: data.get("username") });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <DebouncedInput
          validateFunc={isNameValid}
          id="text_input"
          label="Name"
          type="text"
          name="username"
          required
        />
      </div>
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
