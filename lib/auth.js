export const requirePageAuth = ({ req, res }) => {
  const token = req.cookies && req.cookies.burless;

  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return { props: { token } };
};