import { Provider } from "../context";
import cookies from 'next-cookies'
import { useRouter } from "next/router";
import React, {useEffect} from "react";

export default function MyApp ({Component, pageProps, token}) {
  const router = useRouter();
  const {pathname} = router;
//TODO: Check protected route
  useEffect(() => {
    if ((pathname === '/profile' || pathname === '/statistic') && !token) {
      router.push('/login')
    }
  });

  return (
    <Provider>
      <Component {...pageProps} token={token} />
    </Provider>
  )
}

MyApp.getInitialProps = async ({ctx}) => {
  const token = cookies(ctx).burless;
  return {
    token
  }
};