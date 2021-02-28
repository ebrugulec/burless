import Layout from '../components/Layout'
import React from 'react'
import {requirePageAuth} from "../lib/auth";

export default function Statistic () {
  return <Layout>Statistic</Layout>
}

export const getServerSideProps = async (ctx) => {

  try {
    const res = await fetch(`http://localhost:8080/api/links/statistic/totalInfo`)
    if (res.status !== 200) {
      throw new Error('Failed to fetch')
    }
    console.log('res.json() sta', await res.json());
  } catch (err) {
  }
  //TODO: Handle catch
  return {
    props: {},
  }
}
