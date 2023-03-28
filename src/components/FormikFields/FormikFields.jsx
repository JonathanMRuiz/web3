/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-classes-per-file */
import React from "react";
import Select from "react-select";

import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, Label } from "reactstrap";

const FormikReactSelect = ({
  name,
  value,
  options,
  isMulti,
  className,
  onChange,
  onBlur,
  placeholder,
}) => {
  const handleChange = (val) => {
    onChange(name, val);
  };

  const handleBlur = () => {
    if (onBlur) onBlur(name, true);
  };

  return (
    <Select
      className={`react-select ${className}`}
      classNamePrefix="react-select"
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
    />
  );
};

const FormikCheckboxGroup = ({
  name,
  value,
  options,
  inline = false,
  onChange,
  onBlur,
}) => {
  const handleChange = (val) => {
    const valueArray = [...value] || [];
    if (!valueArray.includes(val)) {
      valueArray.push(val);
    } else {
      valueArray.splice(valueArray.indexOf(val), 1);
    }
    onChange(name, valueArray);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <>
      {options.map((child, index) => {
        return (
          <div
            key={`${name}_${child.value}_${index}`}
            className={`position-relative form-check ${
              inline ? "form-check-inline" : ""
            }`}
          >
            <input
              name={name}
              type="checkbox"
              className="form-check-input"
              onChange={() => handleChange(child.value)}
              onBlur={handleBlur}
              defaultChecked={value.includes(child.value)}
              disabled={child.disabled}
            />
            <label className="form-check-label">{child.label}</label>
          </div>
        );
      })}
    </>
  );
};

const FormikCustomCheckboxGroup = ({
  name,
  value,
  options,
  onChange,
  onBlur,
  className,
}) => {
  const handleChange = (val) => {
    const valueArray = [...value] || [];
    if (!valueArray.includes(val)) {
      valueArray.push(val);
    } else {
      valueArray.splice(valueArray.indexOf(val), 1);
    }
    onChange(name, valueArray);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <>
      {options.map((child, index) => {
        return (
          <Label
            check
            for={`${name}_${child.value}_${index}`}
            className={className}
            key={`${name}_${child.value}_${index}`}
            style={{ color: "#747373" }}
          >
            <Input
              id={`${name}_${child.value}_${index}`}
              type="checkbox"
              name={child.name}
              onChange={() => handleChange(child.value)}
              onBlur={handleBlur}
              checked={value.includes(child.value)}
              disabled={child.disabled}
            />
            {child.label}
          </Label>
        );
      })}
    </>
  );
};

const FormikCheckbox = ({ name, value, disabled, label, onChange, onBlur }) => {
  const handleChange = (_event) => {
    onChange(name, !value);
  };
  const handleBlur = () => {
    onBlur(name, true);
  };
  return (
    <div className="position-relative form-check form-check-inline">
      <input
        name={name}
        type="checkbox"
        className="form-check-input"
        onChange={handleChange}
        onBlur={handleBlur}
        checked={value}
        disabled={disabled}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
};

const FormikCustomCheckbox = ({
  name,
  value,
  disabled,
  label,
  onChange,
  onBlur,
}) => {
  const handleChange = (_event) => {
    onChange(name, !value);
  };
  const handleBlur = () => {
    onBlur(name, true);
  };
  return (
    <Label check for={name} style={{ color: "#747373" }}>
      <Input
        type="checkbox"
        id={name}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        checked={value}
        disabled={disabled}
      />
      {label}
    </Label>
  );
};

const FormikRadioButtonGroup = ({
  name,
  value,
  options,
  inline = false,
  onChange,
  onBlur,
}) => {
  const handleChange = (val) => {
    onChange(name, val);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return (
    <>
      {options.map((child, index) => {
        return (
          <div
            key={`${name}_${child.value}_${index}`}
            className={`position-relative form-check ${
              inline ? "form-check-inline" : ""
            }`}
          >
            <input
              id={child.value}
              name={name}
              type="radio"
              className="form-check-input"
              onChange={() => handleChange(child.value)}
              onBlur={handleBlur}
              defaultChecked={value === child.value}
              disabled={child.disabled}
            />
            <label className="form-check-label">{child.label}</label>
          </div>
        );
      })}
    </>
  );
};

const FormikCustomRadioGroup = ({ name, value, options, onChange, onBlur }) => {
  const handleChange = (val) => {
    onChange(name, val);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  return options.map((child, index) => (
    <Label
      check
      for={`${name}_${child.value}_${index}`}
      key={`${name}_${child.value}_${index}`}
      style={{
        fontWeight: 400,
        lineHeight: "29.05px",
        color: "#747373",
      }}
    >
      <Input
        type="radio"
        id={`${name}_${child.value}_${index}`}
        name={child.name}
        onChange={() => handleChange(child.value)}
        onBlur={handleBlur}
        checked={value === child.value}
        disabled={child.disabled}
      />
      {child.label}
    </Label>
  ));
};

const FormikTagsInput = ({ name, value, onChange, onBlur }) => {
  const handleChange = (val) => {
    onBlur(name, true);
    onChange(name, val);
  };

  return <TagsInput name={name} value={value} onChange={handleChange} />;
};

const FormikSwitch = ({ name, value, className, onChange, onBlur }) => {
  const handleChange = (val) => {
    onBlur(name, true);
    onChange(name, val);
  };

  return (
    <Switch
      name={name}
      className={className}
      checked={value}
      onChange={handleChange}
    />
  );
};

const FormikDatePicker = ({ name, value, className, onChange, onBlur }) => {
  const handleChange = (val) => {
    onChange(name, val);
  };

  const handleBlur = (_val) => {
    onBlur(name, true);
  };

  return (
    <DatePicker
      name={name}
      className={className}
      selected={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export {
  FormikReactSelect,
  FormikCheckboxGroup,
  FormikCustomCheckboxGroup,
  FormikCheckbox,
  FormikCustomCheckbox,
  FormikRadioButtonGroup,
  FormikCustomRadioGroup,
  FormikTagsInput,
  FormikSwitch,
  FormikDatePicker,
};
