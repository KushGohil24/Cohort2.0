import React, { useEffect, useState } from "react"
import Markdown from "react-markdown"
import MacWindow from "./MacWindow";
import SyntaxHighlighter from "react-syntax-highlighter";
import "./note.scss"
import { atelierDuneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
const Note = () => {
    const [markdown, setMarkdown] = useState("");
    useEffect(()=>{
        fetch("./note.txt")
        .then(res=> res.text())
        .then(text=> setMarkdown(text))
    }, [])
    return (
        <MacWindow>
            <div className="note-window" >
                {
                    markdown ? 
                        <SyntaxHighlighter language="typescript" style={atelierDuneDark} >
                            {markdown}
                        </SyntaxHighlighter> :
                        <p>loading...</p>
                }
            </div>
        </MacWindow>
    )
}
export default Note