import React, { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [clickCount, setClickCount] = useState(0);
  const [liStyle, setLiStyle] = useState({ display: "none" });

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleImgClick = () => {
    setClickCount(prevCount => prevCount + 1);
    if (clickCount === 2) {
      setLiStyle({ display: "inline-block" });
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0">
        <a className="flex items-center">
          <img
            src="nameLogo.png"
            id="image-logo"
            alt="Logo"
            className="h-20 mr-3"
            onClick={handleImgClick}
          />
        </a>
        <button className="md:hidden" onClick={handleMenuClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="text-color:red first-letter:first-line:"
              >
                Home
              </Link>
            </li>
            <li>
              <Link href="/Interview">Gym</Link>
            </li>
            <li style={liStyle}>
              <Link href="AddQuestion">Add Question</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
