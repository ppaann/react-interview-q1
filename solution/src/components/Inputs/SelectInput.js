import React, { useEffect, useState } from "react";
import SelectInputView from "./SelectInputView";
import { getLocations } from "../../mock-api/apis";

const SelectInput = ({ id, name, label }) => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;
    // fetch options
    getLocations()
      .then((res) => {
        if (isMounted) setOptions(res);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err || "Failed to fetch locations!");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);
  const onChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <SelectInputView
      options={options}
      onChange={onChange}
      error={error}
      id={id}
      name={name}
      label={label}
    />
  );
};

export default SelectInput;
