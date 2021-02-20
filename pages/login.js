import { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import { Context } from "../context";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// import Layout from "../component/Layout";

import { login } from './api/userApi'
import { error } from 'next/dist/build/output/log'
import axios from "axios";
// import useUser from "../data/useUser";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
  }

  return (
    <div className="container">
      <h2 className="text-center"> login </h2>
      <form onSubmit={onLoginSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            value={email}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {JSON.stringify(state)}
      </form>
    </div>
  )
}

export default Login
