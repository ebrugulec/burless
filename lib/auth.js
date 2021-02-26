export const requirePageAuth = ({ req, res }) => {
  console.log('inner k', req)
  const session = req.cookies && req.cookies.burless;

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return { props: { session } };
};