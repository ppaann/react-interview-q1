import React, { useEffect, useReducer } from "react";
import useDebounce from "../../utils/hooks/useDebounce";
import TextInput from "./TextInput";
import { INIT_STATE, formReducer } from "../../utils/reducer/formReducer";

const DebouncedTextInput = ({ validateFunc, ...props }) => {
  // const [inputValue, setInputValue] = useState("");
  const [state, dispatch] = useReducer(formReducer, INIT_STATE);
  const { inputValue, isValidating, isValid, hasError, error } = state;
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedValue) {
      console.log("debouncedValue", debouncedValue);
      dispatch({
        type: "VALIDATING_START",
      });
      // call the validate function
      validateFunc(debouncedValue)
        .then((result) => {
          console.log("resp", result);
          if (result) {
            dispatch({
              type: "SET_FIELD_STATUS_VALID",
            });
          } else {
            dispatch({
              type: "SET_FIELD_STATUS_INVALID",
              payload: {
                error: "Name is not valid",
              },
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [debouncedValue, validateFunc]);

  const onHandleChange = (e) => {
    const value = e.target.value;

    if (value === "" || value.trim() === "") {
      dispatch({
        type: "RESET",
      });
    } else {
      dispatch({ type: "SET_INPUT", payload: value });
    }
  };
  return (
    <TextInput
      {...props}
      handleChange={onHandleChange}
      value={inputValue}
      isValidating={isValidating}
      isValid={isValid}
      hasError={hasError}
      error={error}
    />
  );
};

export default DebouncedTextInput;
