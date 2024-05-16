import { createContext, useContext, useState } from "react";

export const FormDataContext = createContext(null);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);

  const addFormData = (data) => {
    setFormData([...formData, data]);
  };

  return (
    <FormDataContext.Provider value={{ formData, addFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export function useFormDataContext() {
  const { formData } = useContext(FormDataContext);
  if (!formData) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return formData;
}

export function useAddFormDataContext() {
  const { addFormData } = useContext(FormDataContext);
  if (!addFormData) {
    throw new Error("useAddFormData must be used within a FormDataProvider");
  }
  return addFormData;
}
