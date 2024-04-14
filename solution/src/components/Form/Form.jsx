import React, { useState, useEffect, useRef, useContext } from "react";
import { isNameValid, getLocations } from "../../mock-api/apis";

import { FormDataContext } from "../../context/FormDataContext";

const Form = () => {
  // The mockup of the UI state for each form control is in the mockup.png
  const [name, setName] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stateText, setStateText] = useState("");
  const inputNameRef = useRef(null);

  //location select
  const [location, setLocation] = useState("");
  const [options, setOptions] = useState([]);
  const fetchLocations = async () => {
    // it is better to add loading state here but I ignore it for now
    const locations = await getLocations();
    setOptions(locations);
  };

  // set context
  const { addFormData } = useContext(FormDataContext);

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
    if (!isValidName) {
      setIsError(true);
      setStateText(
        name.trim() === "" ? "Must enter a name" : "The name is not valid"
      );
      inputNameRef.current.focus();
      return;
    }
    if (location === "") {
      alert("Please select a location"); // hard coded alert message
      return;
    }
    addFormData({ name, location });
    handleResetForm();
  };

  // I was thinking of using a single function to handle both inputs
  // but maybe it would be done in the future
  const handleInputChange = (identifier, value) => {
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
            ref={inputNameRef}
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={name}
          />
          <span className="control-state-icon"></span>
          <div className="control-state">{stateText}</div>
        </div>
      </div>
      <div className="form-control" required>
        <label htmlFor="location">Location:</label>
        <div className="input-wrapper">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onClick={fetchLocations}
          >
            <option value="">Select a location</option>
            {!options ? (
              <p>Loading</p>
            ) : (
              options.map((option, i) => (
                // there is no id, use index as key
                <option key={i} value={option}>
                  {option}
                </option>
              ))
            )}
          </select>
          {/* There should be error handling for the select, but I ignore it for now */}
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
