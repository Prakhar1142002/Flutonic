import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>FLUTONI&copy;</h1>
        <p>Quality Content is our first priority</p>

        <p>Copyrights 2021 &copy; Prakhar Rai</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/flutonic">Instagram</a>
        <a href="https://www.youtube.com/channel/UC4VFN7uSl2BgYbzl0apXytw">
          Youtube
        </a>

        <a href="https://www.linkedin.com/in/prakhar-rai-1142002/">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
