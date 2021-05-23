import Head from 'next/head'
import Header from './Header/Header'
import NavBar from './NavBar/NavBar'
import authenticatedNavButtons from '../../config/authenticatedNavButtons'
import unauthenticatedNavButtons from '../../config/unauthenticatedNavButtons'
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import Footer from "./Footer/Footer";

const Layout = (props) => {
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
    <div>
      <Head>
        <title>Burless</title>
      </Head>
      <Header appTitle={appTitle} />
      <NavBar navButtons={navButtons} />
      <div className="content">
        {props.children}
      </div>
      <style global jsx>{`
        .content {
            display: flex;
            justify-content: center;
            padding-top: 15px;
        }
      `}</style>
      <Footer />
    </div>
  )
};

export default Layout
