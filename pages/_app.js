import React, {useEffect, useReducer} from "react";
import {Context, combineReducers} from "../context";
import cookies from 'next-cookies'
import {user} from "../context/reducers/user";
import '../styles/reset.scss';
import HeadComponent from "../components/Head";
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/app.scss'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { useRouter } from 'next/router';

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

  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag('config', '[Tracking ID]', {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
