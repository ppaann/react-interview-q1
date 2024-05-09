const INIT_STATE = {
  username: "",
  fieldStatus: {
    username: {
      isValidating: false,
      error: "",
      isValid: false,
    },
  },
};

const formReducer = (state, action) => {
  console.log("action", action, "state", state);
  switch (action.type) {
    case "VALIDATING_START":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        fieldStatus: {
          ...state.fieldStatus,
          [action.payload.name]: {
            isValidating: true,
            error: "",
            isValid: false,
          },
        },
      };
    case "SET_FIELD_STATUS_VALID":
      return {
        ...state,
        fieldStatus: {
          ...state.fieldStatus,
          [action.payload.name]: {
            isValidating: false,
            error: "",
            isValid: true,
          },
        },
      };
    case "SET_FIELD_STATUS_INVALID":
      return {
        ...state,
        fieldStatus: {
          ...state.fieldStatus,
          [action.payload.name]: {
            isValidating: false,
            error: action.payload.error,
            isValid: false,
          },
        },
      };
    default:
      return state;
  }
};
export { INIT_STATE, formReducer };
