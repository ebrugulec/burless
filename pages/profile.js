import Layout from '../components/Layout'
import React from 'react'
import {requirePageAuth} from "../lib/auth";

export default function Profile () {
  return <Layout>Profile</Layout>
}

export const getServerSideProps = requirePageAuth;
