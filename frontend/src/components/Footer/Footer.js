import React from "react";
import "./Footer.scss";
import App from "../../images/App.png";

function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Keep Shopping</h4>
        <p>Download the App for Android</p>
        <img src={App} alt="" />
      </div>

      <div className="midFooter">
        <h1>Apni Dukaan</h1>
        <h4>Shopping made easy</h4>
        <p>Copyrights 2022 &copy; isolated_coder</p>
      </div>

      <div className="rightFooter">
        <h3> Follow Us</h3>
        <a href="https://github.com/Ark2307">Github</a>
        <a href="https://www.linkedin.com/in/aryan-khandelwal-b847271a7/">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;
