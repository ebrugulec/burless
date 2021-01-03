// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home({id}) {
  const router = useRouter()
  useEffect(() => {
    // Always do navigations after the first render
    router.push('/', undefined, { shallow: true })
  }, [])
console.log('id', id)
  return (
    <div>
     Heyy
    </div>
  )
}

Home.getInitialProps = ({query: {id}}) => {
  return {id};
};