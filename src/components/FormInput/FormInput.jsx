import { Field } from "formik";
import React from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { FiUpload } from "react-icons/fi";
import {
  FormikCustomCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikReactSelect,
} from "../FormikFields/FormikFields";

const FormInput = ({
  label,
  type,
  error,
  touched,
  inlineGroup,
  separatedLabel,
  nameLabel,
  ...props
}) => {
  let component;
  if (type === "select") {
    component = <FormikReactSelect id={props.name} {...props} />;
  } else if (type === "checkbox") {
    component = <FormikCustomCheckbox label={messages[label]} {...props} />;
  } else if (type === "checkbox-group") {
    component = <FormikCustomCheckboxGroup {...props} />;
  } else if (type === "radio") {
    component = <FormikCustomRadioGroup {...props} />;
  } else if (type === "file") {
    const { value, name, onChange, multiple, accept } = props;
    let filename = "";
    if (value) {
      if (Array.isArray(value) && value.length) {
        filename = value[value.length - 1].filename;
      } else {
        filename = value.filename;
      }
    }
    component = (
      <div>
        <input
          id={name}
          name={name}
          type="file"
          className="form-control d-none"
          onChange={(event) => {
            onChange(
              name,
              multiple
                ? event.currentTarget.files
                : event.currentTarget.files[0]
            );
          }}
          value={filename}
          accept={accept}
        />

        <div
          className="d-flex justify-content-around p-2"
          style={{
            border: "0.1px solid #5625EE",
            borderRadius: "10px",
          }}
        >
          <Label htmlFor={name} style={{ color: "#750dff", fontWeight: 700 }}>
            <Row
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <div className="d-flex justify-content-center align-items-center p-2">
                <FiUpload style={{ fontWeight: 700 }} />
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <span>{nameLabel}</span>
              </div>
            </Row>
          </Label>
        </div>
      </div>
    );
  } else if (type === "textarea") {
    component = (
      <Field type="text" as="textarea" className="form-control" {...props} />
    );
  } else {
    component = (
      <Col xl="12">
        <Field type={type || "text"} className="customInput" {...props} />
      </Col>
    );
  }
  return (
    <FormGroup
      className={`form-group ${separatedLabel ? "" : "has-float-label"}${
        inlineGroup
          ? "d-flex justify-content-between align-items-start flex-wrap"
          : ""
      }`}
    >
      {label && type !== "checkbox" && type !== "checkbox-group" && (
        <Label className="customFont font-weight-bold h6" for={props.name}>
          {label}
        </Label>
      )}
      {component}
      {error && touched && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </FormGroup>
  );
};

export default FormInput;
