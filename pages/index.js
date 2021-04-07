import Head from 'next/head'
import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import cookies from 'next-cookies'
import Dashboard from './dahsboard'
import axios from 'axios'
import LinkList from '../components/LinkList'
import Layout from '../components/Layout'
import Link from 'next/link'
import {Context} from "../context";
import {error} from "next/dist/build/output/log";

export default function Home (props) {
  const { state, dispatch } = useContext(Context);
  const {links, token} = props.data;
  console.log('props id', props)
  const router = useRouter();
  useEffect(() => {
    if (props.id) {
      router.push('/', undefined, { shallow: true })
    }
  }, []);
  //TODO: token var ama hic link yoksa uyari ver.

  if (token || (links && links.length > 0)) {
    return (
      <Layout>
        <div className="home-page">
          <LinkList linkData={props.data} id={props.id} />
        </div>
      </Layout>
    )
  } else {
    return <Dashboard />
  }
}

export const getServerSideProps = async (context) => {
  const { query } = context
  const token = cookies(context).burless || null
  const id = context.query.id ? JSON.parse(context.query.id) : null
  const session = cookies(context).burless_session || null
  const page = query.page || 1

  console.log('context.query', id)

  try {
    const response = await fetch(`http://localhost:8080/api/links?page=${page}`, {
      credentials: 'include',
      ...(context.req
        ? {
          headers: {
            Cookie: context.req.headers.cookie
          },
        }
        : {}),
    });
    let result = await response.json();
    const resultData = {
      data: result.data || null,
      id: id,
      session,
      token,
    };
    return { props: resultData };
  } catch {
    return { props: { data: null } };
  }
};
