import Layout from '../components/Layout'
import React from 'react'
import {requirePageAuth} from "../lib/auth";
import axios from 'axios';
import cookies from 'next-cookies'
import {redirectLogin} from "../utils";
import '../styles/Profile.scss'

function Profile (props) {
  //TODO: Check whe data is null
  return <Layout>
    <div className="profile">
      <main>
        <div className="profile-card">
          <div className="img-div">
          </div>
          <div className="content-div">
            <div className="title-div">
              <h2 className="title text-opacity">ebrugulec</h2>
            </div>
            <div className="desc-div">
              <p className="desc-text text-opacity">
                ebru@gulec.com
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </Layout>
}

export const getServerSideProps = async (context) => {
  const token = cookies(context).burless;
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
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
    return { props: { data: result.data ? result.data : null } };
  } catch {
    return { props: { data: null } };
  }
}

export default Profile
