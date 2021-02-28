import Layout from '../components/Layout'
import React from 'react'

export default function Link () {
  return <Layout>Link</Layout>
}

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`http://localhost:8080/api/links/statistic/totalInfo`)
    if (res.status !== 200) {
      throw new Error('Failed to fetch')
    }
  } catch (err) {
  }
  //TODO: Handle catch
  return {
    props: {
    },
  }
};