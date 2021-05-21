import Layout from '../components/Layout'
import React from 'react'

function Report (props) {
  console.log('props', props.data)
  return (
    <Layout>
      <div className="report">
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const response = await fetch(`http://localhost:8080/api/links/report`, {
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
    return { props: { data: result.data ? result.data : null } };
  } catch {
    return { props: { data: null } };
  }
};

export default Report
