// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import cookies from 'next-cookies'
import Dashboard from './dahsboard'
import axios from 'axios'
import LinkList from '../components/LinkList'
import Layout from '../components/Layout'
import Link from 'next/link'
import {Context} from "../context";

export default function Home () {
  // const { state, dispatch } = useContext(Context);
  // const {links} = data;
  // const router = useRouter();
  // useEffect(() => {
  //   if (id) {
  //     router.push('/', undefined, { shallow: true })
  //   }
  // }, [])
  // //TODO: token var ama hic link yoksa uyari ver.

  // if (token || (links && links.length > 0)) {
  if (false){
    return (
      <Layout>
        {/*<div className="home-page">*/}
        {/*  <div className="example">Hello World!</div>*/}
        {/*  <LinkList linkData={data} />*/}
        {/*</div>*/}
      </Layout>
    )
  } else {
    return <Dashboard />
  }
}

// export const getServerSideProps = async (context) => {
  // const { query } = context
  // const token = cookies(context).burless || null
  // const id = context.query.id || null
  // const session = cookies(context).burless_session || null
  // const page = query.page || 1
  //
  // try {
  //   const response = await fetch(`http://localhost:8080/api/links?page=${page}`, {
  //     credentials: 'include',
  //     ...(context.req
  //       ? {
  //         headers: {
  //           Cookie: context.req.headers.cookie
  //         },
  //       }
  //       : {}),
  //   });
  //   let result = await response.json();
  //   const resultData = {
  //     data: result.data || null,
  //     id,
  //     session,
  //     token,
  //   };
  //   return { props: resultData };
  // } catch {
  //   return { props: { data: null } };
  // }
// }
