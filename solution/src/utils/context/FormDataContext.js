import React, { createContext, useState } from "react";

// Creating the context
export const FormDataContext = createContext();

// Creating a provider component
export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);

  // Function to update the form data
  const addFormData = (data) => {
    setFormData([...formData, data]);
  };

  return (
    <FormDataContext.Provider value={{ formData, addFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
