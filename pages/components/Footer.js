import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-container">
      <div>
        <p>Name: Xiaolei Jiang</p>
        <p>Email: xiaolei.jiang1998@gmail.com</p>
      </div>
      <p className="copy-right">
        &#169; {currentYear} Xiaolei Jiang. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
