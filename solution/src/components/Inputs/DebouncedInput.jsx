import React, { useEffect, useState } from "react";
import useDebounce from "../../utils/hooks/useDebounce";
import TextInput from "./TextInput";

const DebouncedInput = ({ validateFunc, ...props }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedValue) {
      console.log("debouncedValue", debouncedValue);
      validateFunc(debouncedValue)
        .then((resp) => {
          console.log("resp", resp);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [debouncedValue, validateFunc]);

  const onHandleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <TextInput {...props} value={inputValue} handleChange={onHandleChange} />
  );
};

export default DebouncedInput;
