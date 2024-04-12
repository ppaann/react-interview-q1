import React, { useState, useEffect } from "react";
import { isNameValid } from "../../mock-api/apis";
//import { useDebouncedValue } from "use-debounce";

const Form = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  //const [useDebouncedName] = useDebouncedValue(name, 200);
  const [isValidating, setIsValidating] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stateText, setStateText] = useState("");

  useEffect(() => {
    if (name === "") {
      setIsValidating(false);
      setIsValidName(false);
      setIsError(false);
      setStateText("");
      return;
    }
    const checkNameValidity = async () => {
      const isValid = await isNameValid(name);
      setIsValidating(false);
      setIsError(!isValid);
      // hard coded error message
      setStateText(isValid ? "" : "The name has already been taken.");
      setIsValidName(isValid);
    };

    setIsValidating(true);
    setIsValidName(false);
    const handler = setTimeout(() => {
      checkNameValidity();
    }, 500); // Debounce delay

    return () => clearTimeout(handler);
  }, [name]);

  console.log(isValidName);
  //const isLocationValid = location === "";

  const handleResetForm = () => {
    setName("");
    setLocation("");
    setIsValidating(false);
    setIsError(false);
    setIsValidName(false);
    setStateText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, location);
    handleResetForm();
  };

  const handleInputChange = (identifier, value) => {
    console.log(identifier, value);
    if (identifier === "name") {
      setName(value);
    } else {
      setLocation(value);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div
        className={`form-control ${isError ? "hasError" : ""} ${
          isValidating ? "isValidating" : ""
        } ${isValidName ? "isValid" : ""}`}
      >
        <label htmlFor="name" required>
          Name:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={name}
          />
          <span className="control-state-icon"></span>
          <div className="control-state">{stateText}</div>
        </div>
      </div>
      {/* The following code is commented out because they are for testing different UI cases */}
      {/* <div className={`form-control isValid`}>
        <label htmlFor="name" required>
          Valid:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={name}
          />
          <span className="control-state-icon"></span>
          <div className="control-state"></div>
        </div>
      </div>
      <div className={`form-control isValidating`}>
        <label htmlFor="name" required>
          Loading:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={name}
          />{" "}
          <span className="control-state-icon"></span>
          <div className="control-state">Validating...</div>
        </div>
      </div>
      <div className={`form-control hasError`}>
        <label htmlFor="name" required>
          Error :
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={name}
          />{" "}
          <span className="control-state-icon"></span>
          <div className="control-state">Validating...</div>
        </div>
      </div> */}
      <div className="form-control" required>
        <label htmlFor="location">Location:</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="location"
            name="location"
            onChange={(e) => handleInputChange("location", e.target.value)}
            value={location}
          />

          <span className="control-state-icon"></span>
          <div className="control-state">has error</div>
        </div>
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
