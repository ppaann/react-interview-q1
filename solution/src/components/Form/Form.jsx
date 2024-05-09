import React, { useReducer } from "react";
import { isNameValid } from "../../mock-api/apis";

// import { FormDataContext } from "../../utils/context/FormDataContext";
import { INIT_STATE, formReducer } from "../../utils/reducer/formReducer";
import TextInput from "../Inputs/TextInput";

const Form = () => {
  const [state, dispatch] = useReducer(formReducer, INIT_STATE);

  // set context
  // const { addFormData } = useContext(FormDataContext);

  const handleResetForm = () => {
    // setValues(initValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get("name"), data.get("location"));
  };
  const validateUsername = (value) => {
    isNameValid(value).then((isValid) => {
      console.log("isValid", isValid);
      if (isValid) {
        dispatch({
          type: "SET_FIELD_STATUS_VALID",
          payload: { name: "username" },
        });
      } else {
        dispatch({
          type: "SET_FIELD_STATUS_INVALID",
          payload: {
            name: "username",
            error: "The name is not valid",
          },
        });
      }
    });
  };

  // input validation may differ from input to input
  // this may move to the input component
  const handleValidation = (name, value) => {
    switch (name) {
      case "username":
        validateUsername(value);
        break;
      default:
        break;
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "VALIDATING_START",
      payload: { name: name, value: value },
    });

    handleValidation(name, value);
  };
  console.log(state);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <TextInput
          id="text_input"
          label="Name"
          type="text"
          name="username"
          value={state.username}
          handleChange={handleInputChange}
          error={state.fieldStatus.username.error}
          state={{
            isValidating: state.fieldStatus.username.isValidating,
            isValid: state.fieldStatus.username.isValid,
            isError: state.fieldStatus.username.error,
          }}
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
