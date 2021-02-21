import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Context } from "../context";
import {emailValidation, passwordValidation} from "../utils"
import { login } from './api/userApi'
import FormWrapper from "../components/FormWrapper";

const validate = {
  email: emailValidation,
  password: passwordValidation
};
const initialValues = {
  email: null,
  password: null,
};

const Login = () => {
  const { state, dispatch } = useContext(Context);
  const [errors, setErrors] = useState([])
  const { loggedIn } = state;

  useEffect(() => {
    if (loggedIn) Router.replace("/");
  }, [loggedIn]);

  const onLoginSubmit = async (loginValues) => {
    login(loginValues)
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
      <FormWrapper onLoginSubmit={onLoginSubmit} validate={validate} initialValues={initialValues} isSignUp={false} />
      {errors && errors.map((error, i) => {
        return <div key={i}>{error.msg}</div>
      })}
    </div>
  )
};

export default Login
