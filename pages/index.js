// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import cookies from 'next-cookies'
import Dashboard from "./dahsboard";
import axios from 'axios';

export default function Home() {

  // const router = useRouter()
  // useEffect(() => {
  //   router.push('/', undefined, { shallow: true })
  // }, []);
  //
  // if (burless || links.length > 0) {
  //   return (
  //     <div>
  //       Heyy
  //     </div>
  //   )
  // } else {
  //   return (
  //     <Dashboard />
  //   )
  // }

  return (
    <div>
      Index.js
    </div>
  )
}

// Home.getInitialProps = async (ctx) => {
//   const burless = cookies(ctx).burless;
//   const id = ctx.query.id;
//   const burless_session = cookies(ctx).session;
//   const res = await axios('http://localhost:3000/api/links');
//   const {data} = res.data;
//   //TODO: Handle catch
//   return {
//     id,
//     burless_session,
//     burless,
//     data
//   };
// };