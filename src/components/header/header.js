import React from "react";

import logo from "../../images/logo.png";
import "./header.css";



const Header = () => {
    return (
        <header className="header">
            <div className="wrapper header__container">
            
                <a href="https://bitmaster.ru/" rel="noopener noreferrer" target="_blank">
                    <img className="header__logo" src={logo} alt="main-logo" />
                </a>
        
            </div>
        </header>
    )
};


export default Header;
