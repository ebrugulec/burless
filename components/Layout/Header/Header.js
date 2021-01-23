import Link from "next/link";
import BurlessLogo from "./BurlessLogo"

// import "./Header.scss";

const Header = props => (
  <Link href="/">
    {/*<div className="Header">{props.appTitle}</div>*/}
    <BurlessLogo />
  </Link>
);

export default Header;