import React, { useState, useContext } from 'react'
import { Context } from "../context";
import {nameValidation, emailValidation, passwordValidation} from "../utils"
import { register } from './api/userApi'
import FormWrapper from "../components/FormWrapper";
import {tokenControl} from "../lib/tokenControl";

const validate = {
  username: username => nameValidation("Username", username),
  email: emailValidation,
  password: passwordValidation
};

const initialValues = {
  email: null,
  password: null,
};

const SignUp = () => {
  const { dispatch } = useContext(Context);
  const [errors, setErrors] = useState([])

  const onSignUpSubmit = async (signupValues) => {
    register(signupValues)
      .then((res) => {
        if (res && res.data) {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: res.data.email,
          })
        }
      })
      .catch((err) => {
        if(err.response && err.response.data && err.response.data.errors){
          setErrors(err.response.data.errors)
        }
      });
  };

  return (
    <div className="container">
      <FormWrapper onSignUpSubmit={onSignUpSubmit} validate={validate} initialValues={initialValues} isSignUp={true} />
      {errors && errors.map((error, i) => {
        return <div key={i}>{error.msg}</div>
      })}
    </div>
  )
};

export const getServerSideProps = tokenControl;

export default SignUp
