import Layout from '../components/Layout'
import React from 'react'
import '../styles/Report.scss';
import {faLink, faMousePointer, faUser, faEnvelope, faSignOutAlt, faChartBar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import cookies from "next-cookies";
import {server} from "../config";

function Report (props) {
  const { totalLinks, totalClickCount, mostClicked } = props?.data;
  return (
    <Layout>
      <div className="report">
        <div className="report-wrapper">
          <div className="card">
            <div className="icon">
              <FontAwesomeIcon icon={faLink}/>
            </div>
            <div className="text">
              Total Link Count
            </div>
            <div className="card-info">
              {props.data && props.data.totalLinks}
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <FontAwesomeIcon icon={faMousePointer}/>
            </div>
            <div className="text">
              Total Click Count
            </div>
            <div className="card-info">
              {props.data.totalClickCount[0]?.totalClickCount}
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <FontAwesomeIcon icon={faChartBar}/>
            </div>
            <div className="text">
              Most Clicked Link
            </div>
            <div className="card-info">
              <Link className="" href={`/statistic/${encodeURIComponent(props.data.mostClicked[0]?.linkCode)}`}>
                <a>{props.data.mostClicked[0]?.linkCode}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const token = cookies(context).burless || null
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
    const response = await fetch(`${server}/api/links/report`, {
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
