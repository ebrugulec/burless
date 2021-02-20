import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Context } from "../context";
import {nameValidation, emailValidation, passwordValidation} from "../utils"
import { register } from './api/userApi'
import FormWrapper from "../components/FormWrapper";

const validate = {
  username: username => nameValidation("Username", username),
  email: emailValidation,
  password: passwordValidation
};

const initialValues = {
  email: null,
  password: null,
};
// import useUser from "../data/useUser";

const SignUp = () => {
  const { state, dispatch } = useContext(Context);

  // const { mutate, loggedIn } = useUser();

  // useEffect(() => {
  //   if (loggedIn) Router.replace("/");
  // }, [loggedIn]);
  //
  // if (loggedIn) return <> Redirecting.... </>;

  const onSignUpSubmit = async (values) => {
    console.log('values', values)

    register(values)
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
  };

  return (
    <div className="container">
      <FormWrapper onSignUpSubmit validate={validate} initialValues={initialValues} isSignUp={true} />
    </div>
  )
};

export default SignUp
