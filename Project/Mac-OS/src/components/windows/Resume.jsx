import React from "react";
import MacWindow from "./MacWindow";
import "./resume.scss"
const Resume = ({windowName, setWindowsState}) => {
    return (
        <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
            <div className="resume-window">
                <embed src="./resume.pdf" alt="resume" title="Resume" type="application/pdf"/>
            </div>
        </MacWindow>
    )
}

export default Resume