import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-container">
      &#169; {currentYear} Xiaolei Jiang. All rights reserved.
    </footer>
  );
}

export default Footer;
