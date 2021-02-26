import Layout from '../components/Layout'
import React from 'react'
import {requirePageAuth} from "../lib/auth";

export default function Statistic () {
  return <Layout>Statistic</Layout>
}

export const getServerSideProps = requirePageAuth;
