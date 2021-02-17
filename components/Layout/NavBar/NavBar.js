import style from './NavBar.module.scss'
import NavButton from '../../NavButton'
import React from 'react'
import Link from "next/link";

const NavBar = (props) => (
  <div className={style.NavBar}>
    <Link href="/static" as="/static">
      sta
    </Link>
    <Link href="/" as="/">
      /////
    </Link>

    <Link href="/profile" as="/profile">
      profile
    </Link>
    <Link href="/contact" as="/contact">
      contact
    </Link>
    {/*{props.navButtons.map((button) => (*/}
    {/*  <NavButton key={button.path} path={button.path} label={button.label} />*/}
    {/*))}*/}
  </div>
)

export default NavBar
