import Link from 'next/link'
// import Image from 'next/image';
// import BurlessLogo from "../../../public/burless-logo.png";
// import logo from "../../../public/logo.png";
import Image from 'next/image'
import "../../../styles/Footer.scss"
import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Footer () {
  const dt = new Date();
  return (
    <div className="footer">
      <div className="footer-menu">
        <a className="menu" target="_blank" href="https://twitter.com/glcebru">Me</a>
        <a className="menu" target="_blank" href="https://burless.medium.com">About</a>
      </div>
      <div className="social-links">
        <a href="https://twitter.com/burless_app" target="_blank">
          <Image
            src="/twitter.png"
            layout="fill"
          />
        </a>
      </div>
      <div className="copyright">
        © {dt.getFullYear()} Burless
      </div>
    </div>
  )
}
export default Footer;
