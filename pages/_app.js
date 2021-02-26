import {Context, Provider} from "../context";
import cookies from 'next-cookies'
import { useRouter } from "next/router";
import React, {useContext, useEffect} from "react";

export default function MyApp ({Component, pageProps, token}) {
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const {pathname} = router;
//TODO: Check protected route
//   useEffect(() => {
//     if ((pathname === '/profile' || pathname === '/statistic') && !token) {
//       router.push('/login')
//     }
//   });
//TODO: Suna bak  res.writeHead(307, { Location: '/api/login' }); res.end();
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