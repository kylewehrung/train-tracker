import React from "react";
import { Button, Error, Input, FormField, Textarea } from "../styles";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";





function SignUpForm({ onLogin }) {
 
  
  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
    image_url: yup.string().required(),
    bio: yup.string().required(),
  });



  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
      image_url: "",
      bio: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      fetch("/api/signup", {
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
          console.error(error);
        });
    },
  });






  return (
    <Wrapper>
    <form onSubmit={formik.handleSubmit}>
    <FormFields>
      <FormField>
      <CustomLabel htmlFor="username">Username</CustomLabel>
        <WhiteInput
          type="text"
          id="username"
          autoComplete="off"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <CustomLabel htmlFor="password">Password</CustomLabel>
        <WhiteInput
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <CustomLabel htmlFor="passwordcConfirmation">Password Confirmation</CustomLabel>
        <WhiteInput
          type="password"
          id="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <CustomLabel htmlFor="image_url">Profile Image</CustomLabel>
        <WhiteInput
          type="text"
          id="image_url"
          value={formik.values.image_url}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <CustomLabel htmlFor="bio">Bio</CustomLabel>
        <WhiteTextarea
          rows="4"
          id="bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
      <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Loading..." : "Sign Up"}
        </Button>
      </FormField>
      <FormField>
        {formik.errors &&
          Object.values(formik.errors).map((err) => (
            <Error key={err}>{err}</Error>
          ))
        }
        </FormField>
        </FormFields>
    </form>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
`;

const FormFields = styled.div`
  width: 400px;
`;



const CustomLabel = styled.label`
  color: black;
  background-image: linear-gradient(rgba(225, 185, 185, 0.75), rgba(225, 255, 255, 0.9));
  background-size: 240% auto; /* Adjust the width */
  background-origin: border-box; /* Apply gradient within the border box */
  border-radius: 25px; /* Adjust the corner radius */
  padding: 10px; /* Add padding for better appearance */
  font-size: 2em;
  font-family: cascadia;
`;


const WhiteInput = styled(Input)`
  color: black;
`;

const WhiteTextarea = styled(Textarea)`
  color: black;
  border-radius: 25px; /* Adjust the corner radius */
  font-size: 22px;
`;


export default SignUpForm;
