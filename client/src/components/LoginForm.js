import React from "react";
import { Button, Error, Input, FormField } from "../styles";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";


function LoginForm({ onLogin }) {

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      .then((r) => {
        setSubmitting(false);
        if (r.ok) {
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((error) => {
        setSubmitting(false);
        console.log(`Error: ${error}`)
      });
    },
  });






  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField>
        <CustomLabel htmlFor="username">Username</CustomLabel>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <CustomLabel htmlFor="password">Password</CustomLabel>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <Button color="secondary" type="submit">
          {formik.isSubmitting ? "Loading..." : "Login"}
        </Button>
      </FormField>
      <FormField>
        {formik.errors &&
        Object.values(formik.errors).map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}




const CustomLabel = styled.label`
  color: black;
  background-image: linear-gradient(rgba(225, 185, 185, 0.75), rgba(225, 255, 255, 0.9));
  background-size: 240% auto; /* Adjust the width */
  background-origin: border-box; /* Apply gradient within the border box */
  border-radius: 15px; /* Adjust the corner radius */
  padding: 10px; /* Add padding for better appearance */
  font-size: 2em;
  font-family: cascadia;
`;



export default LoginForm;