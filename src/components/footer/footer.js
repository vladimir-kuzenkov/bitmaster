import React from "react";

import logo from "../../images/logo.png";
import "./footer.css";



const Footer = () => {
    return (
        <footer>
            <div className="wrapper footer__container">
        
                <a href="https://bitmaster.ru/" rel="noopener noreferrer" target="_blank">
                    <img className="footer__logo" src={logo} alt="footer-logo" />
                </a>
    
            </div>
        </footer>
    )
};


export default Footer;
