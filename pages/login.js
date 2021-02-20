import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Context } from "../context";
import {emailValidation, passwordValidation} from "../utils"


const validate = {
  email: emailValidation,
  password: passwordValidation
};
const initialValues = {
  email: null,
  password: null,
};
import { login } from './api/userApi'
import { error } from 'next/dist/build/output/log'
import axios from "axios";
import FormWrapper from "../components/FormWrapper";
// import useUser from "../data/useUser";

const Login = () => {
  const { state, dispatch } = useContext(Context);

  // const { mutate, loggedIn } = useUser();

  // useEffect(() => {
  //   if (loggedIn) Router.replace("/");
  // }, [loggedIn]);
  //
  // if (loggedIn) return <> Redirecting.... </>;

  const onLoginSubmit = async (e) => {
    e.preventDefault()
    if (email && password) {
      login({ email, password })
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: "Ryan Dhungel",
          })
        })
        .catch((err) => {
          if( err.response ){
            console.log(err.response.data);
          }
        });
    }
  };

  return (
    <div className="container">
      <FormWrapper onLoginSubmit validate={validate} initialValues={initialValues} isSignUp={false} />
    </div>
  )
};

export default Login
