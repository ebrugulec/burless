import React, { useState, useContext } from 'react'
import { Context } from "../context";
import {nameValidation, emailValidation, passwordValidation} from "../utils"
import { register } from './api/userApi'
import FormWrapper from "../components/FormWrapper";
import {tokenControl} from "../lib/tokenControl";
import DashboardHeader from "../components/Layout/DashboardHeader";

const validate = {
  username: username => nameValidation("Username", username),
  email: emailValidation,
  password: passwordValidation
};

const initialValues = {
  email: null,
  password: null,
};

const Register = () => {
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
    <>
      <DashboardHeader/>
      <div className="form-wrapper">
        <FormWrapper onSignUpSubmit={onSignUpSubmit} validate={validate} initialValues={initialValues} isSignUp={true} />
        {errors && errors.map((error, i) => {
          return <div key={i}>{error.msg}</div>
        })}
      </div>
    </>
  )
};

export const getServerSideProps = tokenControl;

export default Register
