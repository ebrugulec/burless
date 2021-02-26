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

export default function Home ({ linkData, id }) {
  const { state, dispatch } = useContext(Context);
  console.log('state', state)
  const router = useRouter()
  useEffect(() => {
    if (id) {
      router.push('/', undefined, { shallow: true })
    }
  }, [])
  useEffect(() => {
    dispatch({
      type: "SET_LOGGED_IN_INFO",
    })
  }, [])

  // if (burless || links.length > 0) {
  if (true) {
    return (
      <Layout>
        <div className="home-page">
          <div className="example">Hello World!</div>
          <LinkList linkData={linkData} />
        </div>
      </Layout>
    )
  } else {
    return <Dashboard />
  }

  return <div>Index.js</div>
}

export const getServerSideProps = async (ctx) => {
  const { query } = ctx
  const burless = cookies(ctx).burless;
  const id = ctx.query.id;
  const burless_session = cookies(ctx).session;

  const page = query.page || 1
  let linkData = null

  try {
    const res = await fetch(`http://localhost:8080/api/links?page=${page}`)
    if (res.status !== 200) {
      throw new Error('Failed to fetch')
    }
    linkData = await res.json()
  } catch (err) {
    linkData = { error: { message: err.message } }
  }
  //TODO: Handle catch
  return {
    props: {
      // id,
      // burless_session,
      // burless,
      linkData,
    },
  }
}
