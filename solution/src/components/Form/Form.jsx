import React, { useContext } from "react";
import { isNameValid } from "../../mock-api/apis";

import { FormDataContext } from "../../utils/context/FormDataContext";
import DebouncedInput from "../Inputs/DebouncedInput";
import SelectInput from "../Inputs/SelectInput";

const Form = () => {
  // set context
  const { addFormData } = useContext(FormDataContext);

  const handleResetForm = () => {
    // setValues(initValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(`submitting form: ${data.get("username")}`);
    addFormData({
      username: data.get("username"),
      location: data.get("location"),
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <DebouncedInput
        validateFunc={isNameValid}
        id="text_input"
        label="Name"
        type="text"
        name="username"
        placeholder="Enter your name"
        required
      />
      <SelectInput id="select" label="Location:" name="location" />
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
