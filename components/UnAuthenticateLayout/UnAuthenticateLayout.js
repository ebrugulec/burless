import Head from 'next/head'
import Header from '../Layout/Header/Header'
import NavBar from '../Layout/NavBar/NavBar'
import authenticatedNavButtons from '../../config/authenticatedNavButtons'
import unauthenticatedNavButtons from '../../config/unauthenticatedNavButtons'
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import Footer from "../Layout/Footer/Footer";
import Link from "@material-ui/core/Link";

const UnAuthenticateLayout = (props) => {
  const appTitle = 'Burless';
  const { state } = useContext(Context);
  const { loggedIn } = state;
  const [navButtons, setNavButtons] = useState(unauthenticatedNavButtons);
  useEffect(() => {
    if (loggedIn) {
      setNavButtons(authenticatedNavButtons)
    }
  }, []);
  return (
    <div className="layout">
      <Head>
        <title>Burless</title>
      </Head>
      <Header appTitle={appTitle} />
      <div className="action-button">
        <Link className="action-link" href="/login">
          <a className="login">Login</a>
        </Link>
        <Link className="action-link" href="/signup">
          <a className="signup">Register</a>
        </Link>
      </div>
      <div className="content">
        {props.children}
      </div>
      <style global jsx>{`
        .content {
          display: flex;
          justify-content: center;
          padding-top: 15px;
        }
        
        .action-button {
          text-align: center;
          margin-top: 20px
        }
        
        .action-link {
          margin-right: 10px !important;
        }
        
        .login {
          border: 1px solid #43BA7F;
          border-radius: 3px;
          padding: 5px;
        }
        
        .signup {
          border: 1px solid #FCC231;
          border-radius: 3px;
          padding: 5px;
        }
        
      `}</style>
      <Footer />
    </div>
  )
};

export default UnAuthenticateLayout
