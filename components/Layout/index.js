import Head from "next/head";

import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";

import style from "./Layout.module.scss";
// import "./index.module.scss";

import navButtons from "../../config/buttons";

const Layout = props => {
  const appTitle = `> Burless`;

  return (
    <div className={style.Layout}>
      <Head>
        <title>Burless</title>
      </Head>
      <Header appTitle={appTitle} />
      <div className="Content">{props.children}</div>
      <NavBar navButtons={navButtons} />
    </div>
  );
};

export default Layout;