import Link from "next/link";
import "./Header.scss";
const Header = ({}) => {
  return (
    <div className="nav-parent">
      <div className="nav-container">
        <div className="nav-title">
          <Link href={"/"}>kramola</Link>
        </div>
        <div className="nav-pages">
          <ul>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Latest News</Link>
            <Link href={"/headlines"}>Headlines</Link>
            <Link href={"/aboutus"}>About Us</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
