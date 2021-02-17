// import style from './NavBar.module.scss'
import NavButton from '../../NavButton'
import React from 'react'
import Link from "next/link";

const NavBar = (props) => (
  <div>
    {props.navButtons.map((button) => (
      <NavButton key={button.path} path={button.path} label={button.label} />
    ))}
  </div>
)

export default NavBar
