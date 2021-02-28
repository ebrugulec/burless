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

export default function Home ({ id,
                                session,
                                token,
                                linkData }) {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  console.log('data', id,
    session,
    token,
    linkData)
  useEffect(() => {
    if (id) {
      router.push('/', undefined, { shallow: true })
    }
  }, [])
  //TODO: gecerli bir token olup olmadigina bak. Gecerli degilse islem yap

  if (token || linkData.length > 0) {
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
}

export const getServerSideProps = async (ctx) => {
  const { query } = ctx
  const token = cookies(ctx).burless ? cookies(ctx).burless : null;
  console.log('ctx.query.id', ctx.query.id)
  const id = ctx.query.id ? ctx.query.id : null;
  const session = cookies(ctx).burless_session ? cookies(ctx).burless_session : null;

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
      id,
      session,
      token,
      linkData,
    },
  }
}
