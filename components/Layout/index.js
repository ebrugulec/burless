import Head from 'next/head'
import Header from './Header/Header'
import NavBar from './NavBar/NavBar'
import authenticatedNavButtons from '../../config/authenticatedNavButtons'
import unauthenticatedNavButtons from '../../config/unauthenticatedNavButtons'
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context";

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
      <div className="container-fluid layout">
        <div className="row">
          <div className="col-sm-2 nav-menu-wrapper">
            <Header appTitle={appTitle} />
            <NavBar navButtons={navButtons} />
          </div>
          <div className="col-sm-8">
            <div className="Content">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
