import Link from 'next/link'
// import Image from 'next/image';
// import BurlessLogo from "../../../public/burless-logo.png";
// import logo from "../../../public/logo.png";
import Image from 'next/image'

// import style from "./Header.module.scss";
import React from 'react'

function Header () {
  return (
    <div className="header">
      <Image src="/logo.svg"
       width={77}
       height={30}
      />
      <Image
        src="/hamburger.svg"
       width={24}
       height={24}
      />
    </div>
  )
}
export default Header;
