import Link from 'next/link'
import React from "react";
import "../../styles/Navbar.scss"


const NavButton = (props) => (
  <Link href={props.path} as={props.path} prefetch={false}>
    <div className="menu">
      {console.log('props.icon', props)}

      <span className="icon">{props.icon}</span>
      <span>{props.label}</span>
    </div>
  </Link>
);

export default NavButton
