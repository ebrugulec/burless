import Link from 'next/link'
import React from "react";

const NavButton = (props) => (
  <Link href={props.path} as={props.path} prefetch={false}>
    <div>
      {/*<div className={style.Icon}>{props.icon}</div>*/}
      <span>{props.label}</span>
    </div>
  </Link>
);

export default NavButton
