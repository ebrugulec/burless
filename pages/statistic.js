import Layout from '../components/Layout'
import React from 'react'
import {requirePageAuth} from "../lib/auth";
import cookies from "next-cookies";
import {redirectLogin} from "../utils";

export default function Statistic () {
  return <Layout>Statistic</Layout>
}

export const getServerSideProps = async (ctx) => {
  const token = cookies(context).burless;

  if (!token) {
    redirectLogin();
  }
  try {
    const response = await fetch(`http://localhost:8080/api/users/me`, {
      credentials: 'include',
      ...(context.req
        ? {
          headers: {
            Cookie: context.req.headers.cookie
          },
        }
        : {}),
    });
    let result = await response.json()
    return { props: { data: result.data } };
  } catch {
    return { props: { data: null } };
  }
}
