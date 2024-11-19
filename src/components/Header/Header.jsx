import Link from "next/link";
import "./Header.scss";
const Header = ({}) => {
  return (
    <div className="nav-parent">
      <div className="nav-container">
        <div className="nav-title">
          <h1>kramola</h1>
        </div>
        <ul>
          <Link href={"/"}>Home</Link>
          <li>Newsletter</li>
          <Link href={"/aboutus"}>About Us</Link>
        </ul>
      </div>
    </div>
  );
};
// Home, aboutus, 

export default Header;
