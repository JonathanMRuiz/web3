import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, ErrorMessage } from "formik";

import FormInput from "../FormInput/FormInput";
import { Row, Col, Button, FormGroup } from "reactstrap";

import "../../assets/styles/form.css";

import * as yup from "yup";

const isRequired = "Campo obligatorio";

const validationSchema = yup.object({
  email: yup.string().email("Ingrese email valido"),
  lastAddress: yup
    .string()
    .matches(
      /^0x[a-fA-F0-9]{40}$/g,
      "Ingrese una dirección de billetera válida"
    ),
  newAddress: yup
    .string()
    .required(isRequired)
    .matches(
      /^0x[a-fA-F0-9]{40}$/g,
      "Ingrese una dirección de billetera válida"
    ),
});

const FormFormik = () => {
  const [submittedForm, setSubmittedForm] = useState(false);
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          lastAddress: "",
          newAddress: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          axios({
            method: "post",
            url: "https://webhook-dot-subtle-odyssey-359821.nn.r.appspot.com/register",
            headers: {
              "Content-Type": "application/json",
            },
            data: values,
          })
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });

          resetForm();
          setSubmittedForm(true);
          setTimeout(() => {
            setSubmittedForm(false);
          }, 5000);
        }}
      >
        {({ handleBlur, errors, touched }) => (
          <Row
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Col xl="6" sm="12">
              <div>
                <h1 className="customFont">Obten tu NFT</h1>
              </div>
              <div className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                rutrum, ipsum vel ullamcorper luctus, orci nunc feugiat arcu,
                eget consectetur mi nulla vitae lorem. Mauris accumsan sed velit
                et ultrices. Suspendisse ornare nisi non risus faucibus
                interdum.
              </div>

              <div className="formbg">
                <Form>
                  <FormGroup>
                    <FormInput
                      label="Email"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email@outlook.com"
                      autoComplete="off"
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="email"
                      component={() =>
                        errors.email &&
                        touched.email && (
                          <div className="error">{errors.email}</div>
                        )
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      label="Last Address"
                      type="lastAddress"
                      name="lastAddress"
                      id="lastAddress"
                      placeholder="0xcf41237hDhC1E1e66557AF1f92276R3T93279aGH"
                      autoComplete="off"
                      onBlur={handleBlur}
                    />

                    <ErrorMessage
                      name="lastAddress"
                      component={() =>
                        errors.lastAddress &&
                        touched.lastAddress && (
                          <div className="error">{errors.lastAddress}</div>
                        )
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormInput
                      label="New Address"
                      type="newAddress"
                      name="newAddress"
                      id="newAddress"
                      placeholder="0xcf41237hDhC1E1e66557AF1f92276R3T93279aGH"
                      autoComplete="off"
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="newAddress"
                      component={() =>
                        errors.newAddress &&
                        touched.newAddress && (
                          <div className="error">{errors.newAddress}</div>
                        )
                      }
                    />
                  </FormGroup>
                  <Col className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      className="customBtn"
                      style={{ border: "none" }}
                    >
                      Submit
                    </Button>
                  </Col>
                  {submittedForm && (
                    <div className="text-success">Formulario enviado</div>
                  )}
                </Form>
              </div>
            </Col>
          </Row>
        )}
      </Formik>
    </div>
  );
};

export default FormFormik;
