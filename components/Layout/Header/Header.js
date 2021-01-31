import Link from "next/link";
import Image from 'next/image';
// import BurlessLogo from "../../../public/burless-logo.png";

import style from "./Header.module.scss";
import React from "react";

const Header = props => (
  <Link href="/">
    <Image
      src="/burless-logo.png"
      alt="BurlessLogo"
      width={90}
      height={90}
    />
  </Link>
);

export default Header;