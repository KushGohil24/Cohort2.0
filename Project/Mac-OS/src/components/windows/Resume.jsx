import React from "react";
import MacWindow from "./MacWindow";
import "./resume.scss"
const Resume = () => {
    return (
        <MacWindow>
            <div className="resume-window">
                <embed src="./resume.pdf" alt="resume" title="Resume" type="application/pdf"/>
            </div>
        </MacWindow>
    )
}

export default Resume