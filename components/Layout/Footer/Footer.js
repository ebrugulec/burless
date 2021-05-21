import Link from 'next/link'
// import Image from 'next/image';
// import BurlessLogo from "../../../public/burless-logo.png";
// import logo from "../../../public/logo.png";
import Image from 'next/image'
import "../../../styles/Footer.scss"
import React from 'react'

function Footer () {
  const dt = new Date();
  return (
    <div className="footer">
      {/*<div className="footer-section-img-wrapper">*/}
      {/*  <div className="footer-img">*/}
      {/*    <Image*/}
      {/*      src="/burless-is-more.svg"*/}
      {/*      layout="fill"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="footer-menu">
        About
      </div>
      <div className="social-links">
        <Image
          src="/twitter.png"
          layout="fill"
        />
      </div>
      <div className="copyright">
        © {dt.getFullYear()} Burless
      </div>
    </div>
  )
}
export default Footer;
