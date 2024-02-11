
import Link from "next/link";
import Image from "next/image";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar-sitio sticky-top">
      <div className="container">
        <div className="navbar-container d-flex justify-content-center align-items-center">
          <Link className="navbar-logo mx-auto" href={"/"}>
            <Image width={250} height={30} src={"/logo.svg"} alt="Site logo"/>
          </Link>
        </div>
      </div>
    </nav>
  );
}
