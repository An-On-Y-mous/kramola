import Link from "next/link";
import "./Footer.scss";

const Footer = ({}) => {
  return (
    <div className="footer-parent">
      <div className="footer-container">
        <div className="footer-left">
          <h3>kramola</h3>
          <p>Breaking Political News Across the Globe in Multi-Language</p>
        </div>
        <div className="footer-right">
          <ul>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Terms of Service</Link>
            </li>
            <li>
              <Link href="/aboutus">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
