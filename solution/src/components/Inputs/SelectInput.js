import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import SelectInputView from "./SelectInputView";
import { getLocations } from "../../mock-api/apis";

const SelectInput = forwardRef(
  ({ id, name, label, externalError, selectedOptionChange }, ref) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(""); // [selectedOption, setSelectedOption
    const [error, setError] = useState(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setSelectedOption("");
        setError(null);
      },
    }));

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
      setSelectedOption(e.target.value);
      selectedOptionChange(e.target.value);
    };
    return (
      <SelectInputView
        options={options}
        onChange={onChange}
        error={error || externalError}
        id={id}
        name={name}
        label={label}
        selectedOption={selectedOption}
      />
    );
  }
);

export default SelectInput;
