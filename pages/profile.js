import Layout from '../components/Layout'
import React from 'react'
import {requirePageAuth} from "../lib/auth";
import axios from 'axios';
import cookies from 'next-cookies'
import {redirectLogin} from "../utils";
import '../styles/Profile.scss'
import {server} from "../config";

function Profile (props) {
  //TODO: Check whe data is null
  console.log('props', props);
  return <Layout>
    <div className="profile">
      <div className="card-wrapper">
        <div className="profile-card">
          <div className="img-div">
          </div>
          <div className="content-div">
            <div className="title-div">
              { props.data &&
                <h2 className="title text-opacity">
                  {props.data.username}
                </h2>
              }
            </div>
            <div className="desc-div">
              {props.data &&
                <p className="desc-text text-opacity">
                  {props.data.email}
                </p>
              }
            </div>
          </div>
        </div>
      </div>
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
    const response = await fetch(`${server}/api/users/me`, {
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
    console.log('result', result)
    return { props: { data: result.data ? result.data : null } };
  } catch {
    return { props: { data: null } };
  }
}

export default Profile
