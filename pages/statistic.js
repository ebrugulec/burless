import Layout from '../components/Layout'
import React from 'react'
import {requirePageAuth} from "../lib/auth";
import cookies from "next-cookies";
import {redirectLogin} from "../utils";
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [2, 3, 4, 5, 6, 55, 40]
    }
  ]
};

export default function Statistic () {
  return <Layout>
    <div>
      {/*<h2>Line Example</h2>*/}
      {/*<Line*/}
      {/*  data={data}*/}
      {/*  width={400}*/}
      {/*  height={400}*/}
      {/*/>*/}
    </div>
  </Layout>
}

// export const getServerSideProps = async (context) => {
  // const token = cookies(context).burless;
  //
  // if (!token) {
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   };
  // }
  // try {
  //   const response = await fetch(`http://localhost:8080/api/users/me`, {
  //     credentials: 'include',
  //     ...(context.req
  //       ? {
  //         headers: {
  //           Cookie: context.req.headers.cookie
  //         },
  //       }
  //       : {}),
  //   });
  //   let result = await response.json()
  //   return { props: { data: result.data ? result.data : null } };
  // } catch {
  //   return { props: { data: null } };
  // }
// }
