export const tokenControl = ({ req }) => {
  const token = req.cookies && req.cookies.burless;

  if (token) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return true;
};