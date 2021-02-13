import style from './NavBar.module.scss'
import NavButton from '../../NavButton'
import React from 'react'

const NavBar = (props) => (
  <div className={style.NavBar}>
    {props.navButtons.map((button) => (
      <NavButton key={button.path} path={button.path} label={button.label} />
    ))}
  </div>
)

export default NavBar
