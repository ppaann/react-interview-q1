const INIT_STATE = {
  inputValue: "",
  isValidating: false,
  isValid: null,
  hasError: null,
  error: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        isValidating: true,
        isValid: null,
        inputValue: action.payload,
      };
    case "VALIDATING_START":
      return {
        ...state,
        isValidating: true,
        error: "",
        hasError: false,
        isValid: null,
      };
    case "SET_FIELD_STATUS_VALID":
      return {
        ...state,
        isValidating: false,
        error: "",
        isValid: true,
        hasError: false,
      };
    case "SET_FIELD_STATUS_INVALID":
      return {
        ...state,
        isValidating: false,
        error: action.payload.error,
        isValid: false,
        hasError: true,
      };
    case "RESET":
      return INIT_STATE;
    default:
      return state;
  }
};
export { INIT_STATE, formReducer };
