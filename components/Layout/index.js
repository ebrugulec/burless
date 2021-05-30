import Head from 'next/head'
import Header from './Header/Header'
import NavBar from './NavBar/NavBar'
import authenticatedNavButtons from '../../config/authenticatedNavButtons'
import unauthenticatedNavButtons from '../../config/unauthenticatedNavButtons'
import { useTransition, animated, config } from "react-spring";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import Footer from "./Footer/Footer";
import '../../styles/Layout.scss';
import {faTimes, faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import windowSize from "../../lib/windowSize";
import Link from "next/link";
import NavButton from "../NavButton";


const styleToggleButton = {
  fontSize: "15px",
  color: "rgb(36,36,36)",
  padding: 0,
  border: "none",
  background: "none"
};

const Layout = (props) => {
  const appTitle = 'Burless';
  const { state } = useContext(Context);
  const { loggedIn } = state;
  const [navButtons, setNavButtons] = useState(unauthenticatedNavButtons);
  const size = windowSize();

  let isLargeScreen = size.width > 768;

  useEffect(() => {
    if (loggedIn) {
      setNavButtons(authenticatedNavButtons)
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const fullscreenMenu = useTransition(isOpen, null, {
    from: {
      opacity: 0,
      transform: "scale(0.80)"
    },
    enter: {
      opacity: 1,
      transform: "scale(1)",
      backgroundColor: "#ffffff",
      position: "absolute",
      maxHeight: "100vh",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    },
    leave: { opacity: 0, transform: "scale(0.80)" },
    config: config.gentle
  });

  const openButton = useTransition(isOpen, null, {
    from: {
      opacity: 0,
      transform: "scale(0)",
      position: "absolute"
    },
    enter: {
      opacity: 1,
      transform: "scale(1)"
    },
    leave: { opacity: 0, transform: "scale(0)" },
    config: config.stiff
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="layout"
      style={{
        // position: "relative",
        // padding: "2rem",
        overflow: isOpen ? "hidden" : "auto",
        maxHeight: "100vh"
      }}
    >
      <Head>
        <title>Burless</title>
      </Head>
      <Header appTitle={appTitle} />
      {isLargeScreen ?
        <NavBar navButtons={navButtons} />
        :
        <div className="hamburger-button-wrapper">
          {openButton.map(({ item, key, props }) =>
            !item ? (
              <animated.div key={key} style={props}>
                <button style={styleToggleButton} onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faBars}/>
                </button>
              </animated.div>
            ) : (
              <animated.div key={key} style={props}>
                <button style={styleToggleButton} onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faTimes}/>
                </button>
              </animated.div>
            )
          )}
        </div>
      }

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
      {!isLargeScreen && fullscreenMenu.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <div
                className="hamburger-menu"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  padding: 0,
                  marginTop: "150px",
                  listStyle: "none",
                  overflow: "hidden",
                  textAlign: "left"
                }}
              >
                {navButtons.map((button) => (
                  <NavButton
                    key={button.path}
                    path={button.path}
                    label={button.label}
                    icon={button.icon}
                  />
                ))}
              </div>
              {/*<ul*/}
              {/*  style={{*/}
              {/*    height: "100%",*/}
              {/*    display: "flex",*/}
              {/*    flexDirection: "column",*/}
              {/*    justifyContent: "center",*/}
              {/*    alignItems: "center",*/}
              {/*    fontSize: "8vw",*/}
              {/*    padding: 0,*/}
              {/*    margin: 0,*/}
              {/*    listStyle: "none",*/}
              {/*    overflow: "hidden",*/}
              {/*    textAlign: "left"*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <li>Link 1</li>*/}
              {/*  <li>Link 2</li>*/}
              {/*  <li>Link 3</li>*/}
              {/*  <li>Link 4</li>*/}
              {/*</ul>*/}
            </animated.div>
          )
      )}
    </div>
  )
};

export default Layout
