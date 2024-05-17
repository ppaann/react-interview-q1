import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";
import useDebounce from "../../utils/hooks/useDebounce";
import TextInput from "./TextInput";
import { INIT_STATE, inputReducer } from "../../utils/reducer/inputReducer";

const DebouncedTextInput = forwardRef(
  ({ validateFunc, externalError, onValueChange, ...props }, ref) => {
    const [state, dispatch] = useReducer(inputReducer, INIT_STATE);
    const { inputValue, isValidating, isValid, hasError, error } = state;
    const debouncedValue = useDebounce(inputValue, 300);
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
      reset: () => {
        dispatch({
          type: "RESET",
        });
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
      getValidationState: () => {
        return {
          hasError,
        };
      },
    }));

    useEffect(() => {
      if (debouncedValue) {
        // console.log("debouncedValue", debouncedValue);
        dispatch({
          type: "VALIDATING_START",
        });
        // call the validate function
        validateFunc(debouncedValue)
          .then((result) => {
            // console.log("resp", result);
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
      if (onValueChange) onValueChange();
    };
    return (
      <TextInput
        {...props}
        handleChange={onHandleChange}
        value={inputValue}
        isValidating={isValidating}
        isValid={isValid}
        hasError={hasError || externalError}
        error={externalError || error}
        ref={inputRef}
      />
    );
  }
);

export default DebouncedTextInput;
