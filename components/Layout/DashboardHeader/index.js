import Link from 'next/link'
// import Image from 'next/image';
// import BurlessLogo from "../../../public/burless-logo.png";
// import logo from "../../../public/logo.png";
import Image from 'next/image'
import "../../../styles/DashboardHeader.scss"
import React from 'react'

function DashboardHeader () {
  return (
    <div className="dashboard-header">
      <Link
        href={{
          pathname: '/',
        }}
      >
        <a>
          <Image
            src="/burless-header.svg"
            width={80}
            height={33}
          />
        </a>
      </Link>
      <div className="dashboard-header-menu">
        <Link
          href={{
            pathname: '/login',
          }}
        >
          <a>Login</a>
        </Link>

        <Link
          href={{
            pathname: '/register',
          }}
        >
          <a className="register">Register</a>
        </Link>
      </div>
    </div>
  )
}
export default DashboardHeader;
