import React, { useState } from "react";
import Link from "next/link";
import Rusume from "./Rusume";

export default function NavBar() {
  const [clickCount, setClickCount] = useState(0);
  const [liStyle, setLiStyle] = useState({ display: "none" });
  const [clickMenu, setClickMenu] = useState(false);

  const handleClick = () => {
    setClickMenu(prevState => !prevState);
  };

  const handleImgClick = () => {
    setClickCount(prevCount => prevCount + 1);
    if (clickCount === 2) {
      setLiStyle({ display: "inline-block" });
    }
  };

  return (
    <header className="header-section">
      <div className="logo-section">
        <a href="/">
          <img src="my_self.png" id="image-logo" alt="picOfXiaolei" />
        </a>
        <span className="span-nav">
          <span className="logo-name">XIAOLEI JIANG</span>
          <nav>
            <li className="nav_item">
              <Link href="/Contact" className="link-style">
                Contact
              </Link>
            </li>
            <li className="nav_item">
              <Link href="/Rusume" className="link-style">
                Resume
              </Link>
            </li>
            <li className="nav_item">
              <Link href="/Projects" className="link-style">
                Projects
              </Link>
            </li>
          </nav>
        </span>
      </div>
    </header>
  );
}
