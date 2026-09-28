import React from "react";
import { Rnd } from "react-rnd"
import "./macwindow.scss"

const MacWindow = ({ windowName, setWindowsState, children, width = "60vw" , height = "60vh" }) => {
    return (
        <Rnd
            default={{
                width: width,
                height: height,
                x: 300,
                y: 200
            }}
        >
            <div className="window">
                <div className="nav">
                    <div className="control-button">
                        <div className="close" onClick={()=>setWindowsState((prev)=>({...prev, [windowName]: false}))}></div>
                        <div className="minimize"></div>
                        <div className="maximize"></div>
                    </div>
                    <div className="title">
                        <img src="./window-icons/mac-folder.png" alt="folder" className="mac-folder" />
                        <p>kushgohil - zsh</p>
                    </div>
                </div>
                <div className="main-content">
                    {children}
                </div>
            </div>
        </Rnd>
    )
}

export default MacWindow;