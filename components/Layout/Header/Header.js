import Link from 'next/link'
// import Image from 'next/image';
// import BurlessLogo from "../../../public/burless-logo.png";
// import logo from "../../../public/logo.png";
import Image from 'next/image'
import "../../../styles/Header.scss"
import React from 'react'

function Header () {
  return (
    <div className="header">
      <Link href={`/`}>
        <a>
          <Image src="/burless_is_more.svg"
                 width={80}
                 height={33}
          />
        </a>
      </Link>
      {/*<Image*/}
      {/*  src="/hamburger.svg"*/}
      {/* width={24}*/}
      {/* height={24}*/}
      {/*/>*/}
    </div>
  )
}
export default Header;
