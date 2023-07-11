import React, { useState } from "react";
import Link from "next/link";
import Rusume from "./Rusume";

export default function NavBar() {
  const [clickCount, setClickCount] = useState(0);
  const [liStyle, setLiStyle] = useState({ display: "none" });

  const handleImgClick = () => {
    setClickCount(prevCount => prevCount + 1);
    if (clickCount === 2) {
      setLiStyle({ display: "inline-block" });
    }
  };

  return (
    <header>
      <nav>
        <img
          src="nameLogo.png"
          id="image-logo"
          alt="Logo"
          onClick={handleImgClick}
        />
        <ul className="nav_links">
          <li className="nav_item">
            <Link href="/" className="link-style">
              Home
            </Link>
          </li>
          <li className="nav_item">
            <Link href="/Interview" className="link-style">
              Gym
            </Link>
          </li>
          <li className="nav_item">
            <Link href="/Rusume" className="link-style">
              Rusume
            </Link>
          </li>
          <li className="nav_item">
            <Link href="/Cal" className="link-style">
              Calculator
            </Link>
          </li>
          <li className="nav_item" style={liStyle}>
            <Link href="AddQuestion" className="link-style">
              Add Question
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
