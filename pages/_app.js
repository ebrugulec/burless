import React, {useReducer} from "react";
import {Context, combineReducers} from "../context";
import cookies from 'next-cookies'
import {user} from "../context/reducers/user";

const initialState = {
  user: {},
  loggedIn: false
};

const loggedInInitialState = {
  user: {},
  loggedIn: true
};

export default function MyApp ({Component, pageProps, props}) {
  const [state, dispatch] = useReducer(combineReducers(user), props.token ? loggedInInitialState : initialState);
  const value = { state, dispatch };
  console.log('may app', value)

//TODO: res.writeHead(307, { Location: '/api/login' }); res.end();
  return (
    <Context.Provider value={value}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}

MyApp.getInitialProps = async ({ctx}) => {
  const token = cookies(ctx).burless;
  return { props: { token } };
};