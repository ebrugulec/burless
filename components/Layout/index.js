import Head from "next/head";

import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import style from "./Layout.module.scss";
// import "./index.module.scss";

import navButtons from "../../config/buttons";

const Layout = props => {
  const appTitle = `Burless`;

  return (
    <div className={style.Layout}>
      <Head>
        <title>Burless</title>
      </Head>
      <Header appTitle={appTitle} />
      <div className="row">
        <div className="col-2"><NavBar navButtons={navButtons} /></div>
        <div className="col-10"><div className="Content">{props.children}</div></div>
      </div>
    </div>
  );
};

export default Layout;