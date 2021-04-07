import React, {useReducer} from "react";
import {Context, combineReducers} from "../context";
import cookies from 'next-cookies'
import {user} from "../context/reducers/user";
import '../styles/reset.scss';
import HeadComponent from "../components/Head";
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/app.scss'

if (typeof process.versions === 'undefined') process.versions = {};
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

//TODO: res.writeHead(307, { Location: '/api/login' }); res.end();
  return (
    <Context.Provider value={value}>
      <HeadComponent/>
      <Component {...pageProps} />
    </Context.Provider>
  )
}

MyApp.getInitialProps = async ({ctx}) => {
  const token = cookies(ctx).burless;
  return { props: { token } };
};
