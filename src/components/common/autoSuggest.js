import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const AutoSuggest = (props) => {
  const {
    id = "controllable-autocomplete",
    field,
    handleChange,
    // label,
    options = [],
    option = { title: "", value: "" },
    disabled = false,
    changeOptionBaseOnValue = () => {},
  } = props;

  const [value, setValue] = useState(option ?? { title: "", value: "" });
  const [inputValue, setInputValue] = useState(option?.title ?? "");

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        handleChange(field, newValue?.value || "");
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        changeOptionBaseOnValue(newInputValue, field);
      }}
      id={id}
      options={options}
      getOptionLabel={(option) => (option ? option.title : "")}
      disabled={disabled}
      renderInput={(params) => (
        <TextField {...params} label={""} variant="standard" />
      )}
    />
  );
};

export default AutoSuggest;
