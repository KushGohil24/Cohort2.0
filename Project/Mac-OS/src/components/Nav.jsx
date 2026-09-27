import React from "react"
import "./nav.scss"
import DateTime from "./DateTime"
const Nav = () => {
    return (
        <nav>
            <div className="left">
                <div className="nav-icon">
                    <img src="./navbar-icons/apple.svg" alt="apple-logo" />
                </div>
                <div className="nav-item">
                    <p>Kush Gohil</p>
                </div>
                <div className="nav-item">
                    <p>File</p>
                </div>
                <div className="nav-item">
                    <p>Terminal</p>
                </div>
                <div className="nav-item">
                    <p>Window</p>
                </div>
            </div>
            <div className="right">
                <div className="nav-icon">
                    <img src="./navbar-icons/wifi.svg" alt="wifi" />
                </div>
                <div className="nav-item">
                    <DateTime />
                </div>
            </div>
            
        </nav>
    )
}

export default Nav
