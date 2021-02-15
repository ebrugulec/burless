import cookies from 'next-cookies'
import { useRouter } from 'next/router'

export default function MyApp ({ Component, pageProps, burless }) {
  console.log('burless', burless)
  const router = useRouter()
  console.log('router.pathname', router.pathname)
  if (!burless) {
    const isProtectedRoute =
      router.pathname === "/profile" || router.pathname === "/statistic";

    if (isProtectedRoute) {
      router.push({
        pathname: '/login',
      })
    }

  }
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const {burless} = cookies(ctx);

  return {
    burless
  }
}
