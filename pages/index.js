// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import cookies from 'next-cookies'

export default function Home(props) {
  console.log('props', props)
  const router = useRouter()
  useEffect(() => {
    router.push('/', undefined, { shallow: true })
  }, []);


  return (
    <div>
     Heyy
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const burless = cookies(ctx).burless;
  const id = ctx.query.id;
  const burless_session = cookies(ctx).session;
  const links = await fetch('http://localhost:3000/api/links');
  return {
    id,
    burless_session,
    burless,
    links
  };
};