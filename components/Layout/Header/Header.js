import Link from "next/link";
import BurlessLogo from "./BurlessLogo"

import style from "./Header.module.scss";

const Header = props => (
  <Link href="/">
    <div className={style.Header}><BurlessLogo /></div>
  </Link>
);

export default Header;