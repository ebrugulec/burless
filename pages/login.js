import { useState, useEffect } from "react";
import Router from "next/router";

// import Layout from "../component/Layout";

import { login } from "../requests/userApi";
import {error} from "next/dist/build/output/log";
// import useUser from "../data/useUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { mutate, loggedIn } = useUser();

  // useEffect(() => {
  //   if (loggedIn) Router.replace("/");
  // }, [loggedIn]);
  //
  // if (loggedIn) return <> Redirecting.... </>;

  const onLoginSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login({ email, password })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        })
    }
  };

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
      </form>
    </div>
  );
};

export default Login;